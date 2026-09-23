// ==========================================================================
// J.A.R.V.I.S. 3.2.0 - Tactical Atmospheric & Live Meteorological Engine
// ==========================================================================

let currentWeatherCity = "Delhi";
let currentWeatherData = null;

/**
 * Fetch live meteorological telemetry from Backend or directly from Open-Meteo fallback
 */
async function fetchLiveWeather(city = "Delhi", lat = null, lon = null) {
    const backendUrl = typeof BACKEND_URL !== 'undefined' ? BACKEND_URL : 'http://127.0.0.1:5000';
    let requestUrl = `${backendUrl}/api/weather?city=${encodeURIComponent(city)}`;
    if (lat !== null && lon !== null) {
        requestUrl = `${backendUrl}/api/weather?lat=${lat}&lon=${lon}`;
    }

    try {
        const response = await fetch(requestUrl);
        if (response.ok) {
            const data = await response.json();
            if (data && data.status === 'success') {
                currentWeatherData = data;
                currentWeatherCity = data.city || city;
                updateHUDWeatherDisplay(data);
                return data;
            }
        }
    } catch (err) {
        console.warn("[Weather] Backend endpoint unavailable, querying Open-Meteo direct channel...", err);
    }

    // Direct Open-Meteo Fallback
    try {
        let latitude = lat || 28.65195;
        let longitude = lon || 77.23149;
        let cityName = city || "DELHI";

        if (lat === null && city) {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData.results && geoData.results.length > 0) {
                    latitude = geoData.results[0].latitude;
                    longitude = geoData.results[0].longitude;
                    cityName = geoData.results[0].name;
                }
            }
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&timezone=auto`);
        if (weatherRes.ok) {
            const wdata = await weatherRes.json();
            const curr = wdata.current || {};
            const temp = Math.round((curr.temperature_2m || 25) * 10) / 10;
            const feels = Math.round((curr.apparent_temperature || temp) * 10) / 10;
            const humidity = curr.relative_humidity_2m || 50;
            const wind = Math.round((curr.wind_speed_10m || 10) * 10) / 10;
            const pressure = Math.round(curr.surface_pressure || 1013);
            const wcode = curr.weather_code || 0;

            const codeMap = {
                0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
                45: "Fog", 51: "Drizzle", 61: "Rain", 71: "Snow", 80: "Showers", 95: "Thunderstorm"
            };
            const cond = codeMap[wcode] || (wcode > 50 && wcode < 70 ? "Rainy" : "Clear");

            const fallbackResult = {
                status: "success",
                city: cityName.toUpperCase(),
                temp: temp,
                feels_like: feels,
                condition: cond,
                condition_code: wcode,
                emoji: wcode > 50 ? "🌧️" : "☀️",
                humidity: `${humidity}%`,
                humidity_val: humidity,
                wind: `${wind} km/h`,
                pressure: `${pressure} hPa`,
                message: `Atmospheric scan for ${cityName.toUpperCase()}: ${temp}°C, ${cond}. Humidity: ${humidity}%, Wind: ${wind} km/h.`
            };
            currentWeatherData = fallbackResult;
            currentWeatherCity = cityName;
            updateHUDWeatherDisplay(fallbackResult);
            return fallbackResult;
        }
    } catch (e) {
        console.error("[Weather] Direct fallback fetch failed:", e);
    }

    return null;
}

/**
 * Update HUD DOM elements with latest weather telemetry
 */
function updateHUDWeatherDisplay(data) {
    if (!data) return;

    // Header Weather Badge
    const headerWeather = document.getElementById('header-weather-display');
    if (headerWeather) {
        headerWeather.textContent = `${data.temp}°C`;
        headerWeather.title = `${data.city}: ${data.temp}°C, ${data.condition}`;
    }

    const headerCity = document.getElementById('header-weather-city');
    if (headerCity) {
        headerCity.textContent = data.city;
    }

    // Atmospheric Widget Panel Elements
    const widgetTemp = document.getElementById('hud-weather-temp');
    if (widgetTemp) widgetTemp.textContent = `${data.temp}°C`;

    const widgetCity = document.getElementById('hud-weather-city');
    if (widgetCity) widgetCity.textContent = data.city;

    const widgetCond = document.getElementById('hud-weather-condition');
    if (widgetCond) widgetCond.textContent = `${data.emoji || '🌤️'} ${data.condition}`;

    const widgetHumidity = document.getElementById('hud-weather-humidity');
    if (widgetHumidity) widgetHumidity.textContent = data.humidity;

    const widgetWind = document.getElementById('hud-weather-wind');
    if (widgetWind) widgetWind.textContent = data.wind;

    const widgetPressure = document.getElementById('hud-weather-pressure');
    if (widgetPressure) widgetPressure.textContent = data.pressure;

    const widgetFeels = document.getElementById('hud-weather-feels');
    if (widgetFeels) widgetFeels.textContent = `${data.feels_like || data.temp}°C`;
}

/**
 * Format a rich tactical weather report card for chat stream
 */
function buildWeatherChatCard(data) {
    if (!data) return "Atmospheric scan unavailable.";

    return `========================================================
    🌐 J.A.R.V.I.S. ATMOSPHERIC METEOROLOGICAL SCAN
========================================================
📍 LOCATION       : ${data.city} ${data.country ? `(${data.country})` : ''}
🌡️ TEMPERATURE    : ${data.temp}°C (Feels like: ${data.feels_like || data.temp}°C)
⛅ CONDITION      : ${data.emoji || '🌤️'} ${data.condition}
💧 HUMIDITY       : ${data.humidity}
💨 WIND SPEED     : ${data.wind}
🧭 ATM. PRESSURE  : ${data.pressure}
========================================================
[+] Status: Live Atmospheric Telemetry Verified.`;
}

/**
 * Switch/Search Weather City from UI
 */
async function promptChangeWeatherCity() {
    const newCity = prompt("Enter target city or region for atmospheric scan:", currentWeatherCity);
    if (newCity && newCity.trim()) {
        if (typeof appendChatBubble === 'function') {
            appendChatBubble('USER', `Weather report for ${newCity.trim()}`);
        }
        if (typeof speak === 'function') {
            speak(`Scanning atmospheric telemetry for ${newCity.trim()}, Sir.`);
        }
        const data = await fetchLiveWeather(newCity.trim());
        if (data && typeof appendChatBubble === 'function') {
            appendChatBubble('JARVIS', buildWeatherChatCard(data), {
                list: [
                    {
                        text: '🔄 Refresh Weather',
                        action: () => fetchLiveWeather(data.city)
                    }
                ]
            });
            if (typeof speak === 'function') {
                speak(`Weather in ${data.city} is ${data.temp} degrees Celsius with ${data.condition}.`);
            }
        }
    }
}

// Auto-initialize weather telemetry on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchLiveWeather(null, pos.coords.latitude, pos.coords.longitude);
                },
                () => {
                    fetchLiveWeather("Delhi");
                },
                { timeout: 4000 }
            );
        } else {
            fetchLiveWeather("Delhi");
        }
    }, 1200);
});