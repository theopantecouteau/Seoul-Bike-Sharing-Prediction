# Seoul Bike Sharing Demand Analysis

## Project Description
This project focuses on analyzing and predicting bike sharing demand in Seoul. Using data from the Seoul Bike Sharing system, the objective is to understand the factors influencing bike rental patterns and to build a predictive model to forecast demand. This analysis is crucial for efficient management of the bike-sharing system, ensuring that bikes are available where and when they are needed most.

## Data Source
The dataset used in this project is the Seoul Bike Sharing Demand dataset, which includes hourly rental data along with weather and seasonal information. https://archive.ics.uci.edu/dataset/560/seoul+bike+sharing+demand

## Data Cleaning/Preparation
The initial step involved cleaning the data, which normally includes handling missing values and anomalies. 
However, the dataset used in this project was already clean and did not require any cleaning.
Moreover, outliers were not removed as they were not considered to be erroneous data points.

## Exploratory Data Analysis (EDA)
Exploratory Data Analysis was conducted to uncover trends, patterns, and anomalies in the data. This included:
- Analyzing rental trends over time - daily, weekly, and seasonal variations.
- Correlation analysis between different variables.

## Modeling
For predicting bike rental demand:
- Use of LazyPredict to evaluate the performance of different models.
- Use of GridSearchCV to tune hyperparameters for the best performing models.
- Finally, use of RandomForestRegressor, the model with the best performance we already know.
- The models were trained on historical data, considering features like weather conditions, time, and seasonality.
- Model performance was evaluated using metrics such as RSE (Root Mean Squared Error) and MAE (Mean Absolute Error).

## Results
- The project successfully identified key determinants of bike sharing demand in Seoul.
- The Random Forest Regressor model was able to predict bike rental demand with a r² score of 0.91.
- Findings indicated that weather conditions, temperature, and time of day are significant predictors of bike rental demand.

## Predictions App
The project also includes a web app that allows users to input weather conditions and seasonal data to predict bike rental demand.
- Use of fastAPI to create the API in a couple of lines of code.
- use of React to create the front-end of the app. (form, error handling, etc.)

## How to Run the Notebooks
1. Ensure Python 3.x is installed.
2. Install necessary libraries for the notebook: `pandas`, `numpy`, `matplotlib`, `seaborn`, `scikit-learn`, `lazypredict`.
3. Install necessary libraries for the app: `fastapi`, `uvicorn`, `requests`, `react`, `node.js`.
3. Clone the repository and navigate to the project directory.
4. Run the Jupyter notebooks in order: `data-cleaning-preparation.ipynb`, `data-visualization.ipynb`, `data-modelling.ipynb`.

(Include a `requirements.txt` file for easy installation of dependencies.)

## Future Work
Future enhancements can include:
- Incorporating real-time weather data for dynamic prediction.
- Exploring deep learning models for improved forecasting accuracy.
- Analyzing the impact of special events and holidays on bike rental demand.

## Contact Information
Hugo Sequier - Theo Pantecouteau
