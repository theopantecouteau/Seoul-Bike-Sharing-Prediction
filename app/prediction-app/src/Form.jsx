import React, { useState } from 'react';
import './form.css';
function DataForm() {
    const [formData, setFormData] = useState({
        day: '',
        hour: '',
        month: '',
        temperature: '',
        humidity: '',
        windSpeed: '',
        visibility: '',
        dewPointTemperature: '',
        solarRadiation: '',
        rainfall: '',
        snowfall: '',
        seasons: '',
        holiday: '',
        functioningDay: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you can add actions to be performed with form data
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="Day" />
            <input type="text" name="hour" value={formData.hour} onChange={handleChange} placeholder="Hour" />
            <input type="text" name="month" value={formData.month} onChange={handleChange} placeholder="Month" />
            <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature(°C)" />
            <input type="text" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity(%)" />
            <input type="text" name="windSpeed" value={formData.windSpeed} onChange={handleChange} placeholder="Wind speed (m/s)" />
            <input type="text" name="visibility" value={formData.visibility} onChange={handleChange} placeholder="Visibility (10m)" />
            <input type="text" name="dewPointTemperature" value={formData.dewPointTemperature} onChange={handleChange} placeholder="Dew point temperature(°C)" />
            <input type="text" name="solarRadiation" value={formData.solarRadiation} onChange={handleChange} placeholder="Solar Radiation (MJ/m2)" />
            <input type="text" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall(mm)" />
            <input type="text" name="snowfall" value={formData.snowfall} onChange={handleChange} placeholder="Snowfall (cm)" />
            <input type="text" name="seasons" value={formData.seasons} onChange={handleChange} placeholder="Seasons" />
            <input type="text" name="holiday" value={formData.holiday} onChange={handleChange} placeholder="Holiday" />
            <input type="text" name="functioningDay" value={formData.functioningDay} onChange={handleChange} placeholder="Functioning Day" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default DataForm;
