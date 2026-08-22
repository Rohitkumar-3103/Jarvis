from flask import Blueprint, request, jsonify
import random

weather_api = Blueprint('weather_api', __name__)

@weather_api.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'New York').strip()
    
    # High-fidelity mock weather metrics for sci-fi HUD display
    conditions = ["Clear Sky", "Overcast Storm", "Rainy Synapse", "Thunderstorm Warning", "Foggy Grid", "Mist", "Scattered Clouds"]
    condition = random.choice(conditions)
    temp = round(random.uniform(18.0, 32.0), 1)
    humidity = random.randint(40, 85)
    wind_speed = round(random.uniform(5.0, 25.0), 1)
    pressure = random.randint(990, 1025)
    
    return jsonify({
        "status": "success",
        "city": city.upper(),
        "temp": temp,
        "condition": condition,
        "humidity": f"{humidity}%",
        "wind": f"{wind_speed} km/h",
        "pressure": f"{pressure} hPa",
        "message": f"Atmospheric scan for {city.upper()} completed: {temp}°C, {condition}."
    })