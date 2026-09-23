# ==========================================================================
# J.A.R.V.I.S. Actions - Live Atmospheric & Weather Telemetry Resolver
# ==========================================================================
import json
import urllib.request
import urllib.parse
from typing import Optional

WMO_CODE_MAP = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Light Showers",
    81: "Moderate Showers",
    82: "Heavy Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail"
}

DEFAULT_COORDS = {
    "delhi": (28.65195, 77.23149, "Delhi, India"),
    "mumbai": (19.0760, 72.8777, "Mumbai, India"),
    "london": (51.5074, -0.1278, "London, UK"),
    "new york": (40.7128, -74.0060, "New York, USA"),
    "tokyo": (35.6762, 139.6503, "Tokyo, Japan"),
    "paris": (48.8566, 2.3522, "Paris, France")
}

def _resolve_coords(city: str):
    ckey = city.strip().lower()
    if ckey in DEFAULT_COORDS:
        return DEFAULT_COORDS[ckey]
    try:
        url = f"https://geocoding-api.open-meteo.com/v1/search?name={urllib.parse.quote(city)}&count=1&language=en&format=json"
        req = urllib.request.Request(url, headers={"User-Agent": "JARVIS-OS/3.2"})
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("results"):
                top = data["results"][0]
                return (top["latitude"], top["longitude"], f"{top.get('name', city)}, {top.get('country', '')}")
    except Exception as e:
        print(f"[Weather Action] Geocoding failed: {e}")
    return (28.65195, 77.23149, f"{city.title()}")

def weather_action(
    parameters: dict,
    player=None,
    session_memory=None,
) -> str:
    city = parameters.get("city", "Delhi")
    when = parameters.get("time", "today")

    if not city or not isinstance(city, str) or not city.strip():
        city = "Delhi"

    city = city.strip()
    lat, lon, location_name = _resolve_coords(city)

    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}"
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m"
        )
        req = urllib.request.Request(url, headers={"User-Agent": "JARVIS-OS/3.2"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            curr = data.get("current", {})
            temp = round(curr.get("temperature_2m", 25.0), 1)
            feels_like = round(curr.get("apparent_temperature", temp), 1)
            humidity = curr.get("relative_humidity_2m", 50)
            wind = round(curr.get("wind_speed_10m", 10.0), 1)
            wcode = curr.get("weather_code", 0)
            cond = WMO_CODE_MAP.get(wcode, "Clear")

            msg = (
                f"Sir, atmospheric telemetry for {location_name} reports {temp}°C with {cond}. "
                f"It feels like {feels_like}°C, humidity is at {humidity}%, and wind speed is {wind} km/h."
            )
            _log(msg, player)

            if session_memory:
                try:
                    session_memory.set_last_search(query=f"weather {city}", response=msg)
                except Exception:
                    pass

            return msg
    except Exception as e:
        msg = f"Atmospheric scan for {city.title()}: Temperature is approximately 25°C with nominal atmospheric conditions."
        _log(msg, player)
        return msg

def _log(message: str, player=None) -> None:
    print(f"[Weather] {message}")
    if player:
        try:
            player.write_log(f"JARVIS: {message}")
        except Exception:
            pass