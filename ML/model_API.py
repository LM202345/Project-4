from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the HDF5 model
model_path = 'model_v8.h5'  # Replace with the correct path
model = tf.keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the JSON request body
        data = request.get_json()

        # Preprocess data according to the model's needs
        features = np.array([[data['stars'],
                              data['reviews'],
                              data['price'],
                              data['isBestSeller'],
                              data['word_count'],
                              data['discount'],
                              data['categoryName_Baby'],
                              data['categoryName_Beauty'],
                              data['categoryName_Grocery'],
                              data['categoryName_Health_Personal_Care'],
                              data['categoryName_Health_Care_Products'],
                              data['categoryName_Home_Kitchen'],
                              data['categoryName_Home_Storage_Organization'],
                              data['categoryName_Office_Products'],
                              data['categoryName_Pet_Supplies'],
                              data['categoryName_Toys_Games']
                            ]])  # Adjust according to the model's features

        # Make the prediction
        prediction = model.predict(features)

        # Get the result as a number
        result = prediction.tolist()[0][0]

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
