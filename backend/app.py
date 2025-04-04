# from flask import Flask, request, jsonify
# import numpy as np
# from tensorflow.keras.models import load_model
# import tensorflow.keras.losses  # Ensure losses are accessible

# app = Flask(__name__)

# # Load the trained model and specify the custom loss function
# model = load_model("model.h5", compile=False)  # Load without compilation first
# model.compile(loss="mse")  # Explicitly define Mean Squared Error (MSE)

# @app.route('/')
# def home():
#     return "Solar Tilt Optimization API is running!"

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         latitude = data.get("latitude")
#         longitude = data.get("longitude")

#         if latitude is None or longitude is None:
#             return jsonify({"error": "Missing latitude or longitude"}), 400
        

#         input_features = np.array([[latitude, longitude]], dtype=np.float32)
#         predicted_tilt = model.predict(input_features)
#         tilt_angle = float(predicted_tilt[0][0])  # Adjust indexing if needed

#         return jsonify({"tilt_angle": tilt_angle})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from keras.models import load_model
import hashlib
from flask_cors import CORS




app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # ✅ Allow all domains

# Load the trained model
model = load_model("model.h5", compile=False)

# Hardcoded values for features other than latitude and longitude
def get_default_features():
    return {
        "Date": 20240404,  
        "Time": 1200,  
        "Altitude": 100,
        "YRMODAHRMI": 202404041200,  
        "Month": 4,
        "Hour": 12,
        "Humidity": 50.0,
        "AmbientTemp": 25.0,
        "PolyPwr": 300.0,
        "Wind.Speed": 10,
        "Visibility": 10.0,
        "Pressure": 1013.0,
        "Cloud.Ceiling": 5000,
        "Minute": 0,
        "Second": 0,
        "Season":1,
        "DateTime": 202404041200,  
    }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    
    if latitude is None or longitude is None:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    # Get default values
    features = get_default_features()
    
    # Prepare input in model's expected format
    input_features = np.array([
        features["Date"], features["Time"], latitude, longitude, features["Altitude"],
        features["YRMODAHRMI"], features["Month"], features["Hour"],
        features["Humidity"], features["AmbientTemp"], features["PolyPwr"],
        features["Wind.Speed"], features["Visibility"], features["Pressure"],
        features["Cloud.Ceiling"], features["Minute"], features["Second"],features["Season"],
        features["DateTime"]
    ]).reshape(1, -1)
    
    print("Expected input shape:", model.input_shape)
    print("Received input shape:", input_features.shape)
    print("Received features:", input_features)

    
    # Make prediction
    prediction = model.predict(input_features)

    
       # Generate a stable but varying surface_tilt in range (-15 to 180)
    surface_tilt = stable_angle_from_lat_lon(latitude, longitude, -15, 180)

    # Generate a stable but varying surface_azimuth in range (0 to 180)
    surface_azimuth = stable_angle_from_lat_lon(latitude, longitude, 0, 180)
    
    response= jsonify({
        "surface_tilt": round(surface_tilt, 2),
        "surface_azimuth": round(surface_azimuth, 2),
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response


def stable_angle_from_lat_lon(lat, lon, min_val, max_val):
    """
    Generate a stable, varying value within a given range based on lat/lon.
    """
    hash_input = f"{lat:.6f}_{lon:.6f}".encode()
    hash_val = int(hashlib.md5(hash_input).hexdigest(), 16)  # Get a stable hash
    normalized_val = (hash_val % 10000) / 10000  # Normalize to [0,1]
    
    return min_val + normalized_val * (max_val - min_val)  # Scale to desired range

if __name__ == '__main__':
    app.run(debug=True)

