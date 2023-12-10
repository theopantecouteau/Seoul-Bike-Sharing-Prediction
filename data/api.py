from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.preprocessing import StandardScaler


class PredictionRequest(BaseModel):

    hour: int
    temperature: float
    humidity: float
    windSpeed: float
    visibility: float
    solarRadiation: float
    rainfall: float
    snowfall: float
    seasons: str
    holiday: int
    functioningDay: int
    day: int
    month: int
    year: int
    weekDay : str

app = FastAPI()
clean_df = pd.read_csv('./data/seoul-bike-data-clean-for-model.csv', encoding='unicode_escape').drop(columns=["Rented Bike Count"])
column_names = clean_df.columns
columns_to_scale = ['Temperature(Â°C)', 'Humidity(%)', 'Wind speed (m/s)', 'Visibility (10m)', 'Solar Radiation (MJ/m2)',  'Rainfall(mm)', 'Snowfall (cm)']
model = joblib.load('model.pkl')
features_scaler = joblib.load('features_scaler.pkl')
target_scaler = joblib.load('target_scaler.pkl')

@app.post('/predict')
async def predict(request: PredictionRequest):
    try:
        df = pd.DataFrame.from_dict(data=request.dict(), orient='index').T
        df.columns = column_names
        print(df)
        print(df.columns)
        print(columns_to_scale)
        df[columns_to_scale] = features_scaler.fit_transform(df[columns_to_scale])
        season_map = {'Winter': 1, 'Spring': 2, 'Summer': 3, 'Autumn': 4}
        dict_day_of_week={'Monday':1,'Tuesday':2,'Wednesday':3,'Thursday':4,'Friday':5,'Saturday':6,'Sunday':7}
        df['WeekDay'] = df['WeekDay'].map(dict_day_of_week)
        df['Seasons'] = df['Seasons'].map(season_map)
        print(df)
        predicted_number_of_rentals = model.predict(df)
        print("Predicted number of rentals: ", predicted_number_of_rentals)
        prediction = target_scaler.inverse_transform(predicted_number_of_rentals.reshape(-1, 1))
        print("Predicted number of rentals: ", prediction)
        return {
            'prediction': round(prediction[0][0])
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