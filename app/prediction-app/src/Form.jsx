import React, { useState } from 'react';
import './form.css';
import LoadingGif from './loading.gif'; // Import your loading GIF

function DataForm() {
    const NONE_INT_VALUE = -1000;
    const NONE_FLOAT_VALUE = -1000.0;
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        day: 0,
        hour: 0,
        month: 0,
        temperature: NONE_FLOAT_VALUE,
        humidity: NONE_FLOAT_VALUE,
        windSpeed: NONE_FLOAT_VALUE,
        visibility: NONE_FLOAT_VALUE,
        solarRadiation: NONE_FLOAT_VALUE,
        rainfall: NONE_FLOAT_VALUE,
        snowfall: NONE_FLOAT_VALUE,
        seasons: '',
        holiday: '',
        functioningDay: '',
        weekday: '',
        year: 0
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;

        // Validation for day, month, and hour


        // Convert to float for numerical fields
        if (type === 'number') {
            newValue = parseFloat(newValue);
        }

        // Update the form data state
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Validation for day, month, and hour
        if (formData.day < 1 || formData.day > 31) {
            alert('Day must be between 1 and 31');
            return; // Prevents form submission
        } else if (formData.month < 1 || formData.month > 12) {
            alert('Month must be between 1 and 12');
            return; // Prevents form submission
        } else if (formData.hour < 1 || formData.hour > 24) {
            alert('Hour must be between 1 and 24');
            return; // Prevents form submission
        } else if (formData.humidity < 0 || formData.humidity > 100) {
            alert('Humidity must be between 0 and 100');
            return; // Prevents form submission
        }
        setIsLoading(true); // Start loading
        console.log(formData.seasons)
        console.log(formData.holiday)
        console.log(formData.functioningDay)
        console.log(formData.weekday)
        // Create the payload
        const payload = {
            hour: parseInt(formData.hour),
            temperature: parseFloat(formData.temperature),
            humidity: parseFloat(formData.humidity),
            windSpeed: parseFloat(formData.windSpeed),
            visibility: parseFloat(formData.visibility),
            solarRadiation: parseFloat(formData.solarRadiation),
            rainfall: parseFloat(formData.rainfall),
            snowfall: parseFloat(formData.snowfall),
            seasons: formData.seasons,
            holiday: parseInt(formData.holiday),
            functioningDay: parseInt(formData.functioningDay),
            day: parseInt(formData.day),
            month: parseInt(formData.month),
            year: parseInt(formData.year),
            weekDay : formData.weekday
        };
        console.log(payload);
        // Sending data to FastAPI
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setResult(data); // Store the result
            setIsLoading(false); // Stop loading
            console.log(data); // Handle the response data as needed
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false); // Stop loading
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="hour">Hour:</label>
            <input type="text" name="hour" value={formData.hour} onChange={handleChange} placeholder="Hour" />

            <label htmlFor="temperature">Temperature (°C):</label>
            <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature(°C)" />

            <label htmlFor="humidity">Humidity (%):</label>
            <input type="text" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity(%)" />

            <label htmlFor="windSpeed">Wind Speed (m/s):</label>
            <input type="text" name="windSpeed" value={formData.windSpeed} onChange={handleChange} placeholder="Wind speed (m/s)" />

            <label htmlFor="visibility">Visibility (10m):</label>
            <input type="text" name="visibility" value={formData.visibility} onChange={handleChange} placeholder="Visibility (10m)" />

            <label htmlFor="solarRadiation">Solar Radiation (MJ/m2):</label>
            <input type="text" name="solarRadiation" value={formData.solarRadiation} onChange={handleChange} placeholder="Solar Radiation (MJ/m2)" />

            <label htmlFor="rainfall">Rainfall (mm):</label>
            <input type="text" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall(mm)" />

            <label htmlFor="snowfall">Snowfall (cm):</label>
            <input type="text" name="snowfall" value={formData.snowfall} onChange={handleChange} placeholder="Snowfall (cm)" />

            <label htmlFor="seasons">Season:</label>
            <select name="seasons" value={formData.seasons} onChange={handleChange}>
                <option value="">Select Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
            </select>

            <label htmlFor="holiday">Holiday:</label>
            <select name="holiday" value={formData.holiday} onChange={handleChange}>
                <option value="">Is it a Holiday?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>

            <label htmlFor="functioningDay">Functioning Day:</label>
            <select name="functioningDay" value={formData.functioningDay} onChange={handleChange}>
                <option value="">Is it a Functioning Day?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>

            <label htmlFor="day">Day:</label>
            <input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="Day" />

            <label htmlFor="month">Month:</label>
            <input type="text" name="month" value={formData.month} onChange={handleChange} placeholder="Month" />

            <label htmlFor="year">Year:</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />

            <label htmlFor="weekday">Weekday:</label>
            <select name="weekday" value={formData.weekday} onChange={handleChange}>
                <option value="">Select Weekday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>

            <button type="submit">Submit</button>
        </form>
        { isLoading && <div className="loading-overlay"><img src={LoadingGif} alt="Loading..." className="loading-gif"/></div>}
        {result && <div className={"result"}>Result: {result.prediction}</div>}
    </>
    );
}

export default DataForm;
