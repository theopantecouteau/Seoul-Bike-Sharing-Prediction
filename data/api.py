from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware


class PredictionRequest(BaseModel):
    size: float
    features: list


app = FastAPI()

model = joblib.load('model.pkl')

@app.post('/predict')
async def predict(request: PredictionRequest):
    try:
        features_array = request.features
        predicted_number_of_rentals = model.predict([features_array])[0]
        return {
            'size': request.size,
            'features': features_array,
            'predicted_number_of_rentals': predicted_number_of_rentals
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)