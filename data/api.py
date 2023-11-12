from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load('model.pkl')

@app.post('/predict')
async def predict(size: float, features: list):
    features_array = features
    predicted_number_of_rentals = model.predict([features_array])
    return {
        'size': size,
        'features': features,
        'predicted_number_of_rentals': predicted_number_of_rentals[0]
    }