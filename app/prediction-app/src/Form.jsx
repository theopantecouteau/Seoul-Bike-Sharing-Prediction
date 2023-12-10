import React, { useState } from 'react';
import './form.css';
import LoadingGif from './loading.gif'; // Import your loading GIF
import { toast } from "react-toastify";

function DataForm() {
    const NONE_INT_VALUE = 0;
    const NONE_FLOAT_VALUE = 0;
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [touched, setTouched] = useState({});
    const [formData, setFormData] = useState({
        day: NONE_INT_VALUE,
        hour: NONE_INT_VALUE,
        month: NONE_INT_VALUE,
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
        year: NONE_INT_VALUE
    });


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;

        if (type === 'number') {
            newValue = parseFloat(newValue);
        }

        setFormData({
            ...formData,
            [name]: newValue
        });
        setTouched({ ...touched, [name]: true });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isFormValid = true;

        const updatedTouched = {};

        for (const field in formData) {
            if (typeof formData[field] === 'string' && formData[field].trim() === '') {
                isFormValid = false;
            }
            else if (typeof formData[field] === 'number' && formData[field] === 0) {
                isFormValid = false;
            }
            updatedTouched[field] = true;
        }

        setTouched(updatedTouched);
        if (!isFormValid) {
            toast.error("Please fill all the fields");
            return;
        }
        if (formData.day < 1 || formData.day > 31) {
            toast.error('Day must be between 1 and 31');
            return;
        } else if (formData.month < 1 || formData.month > 12) {
            toast.error('Month must be between 1 and 12');
            return;
        } else if (formData.hour < 1 || formData.hour > 24) {
            toast.error('Hour must be between 1 and 24');
            return;
        } else if (formData.humidity < 0 || formData.humidity > 100) {
            toast.error('Humidity must be between 0 and 100');
            return;
        } else if (formData.year < 2023) {
            toast.error('Year must be greater than 2023');
            return;
        }
        setIsLoading(true);
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
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setResult(data);
            toast.success("Data sent to FastAPI")
            setIsLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error in sending data to FastAPI")
            setIsLoading(false);
        }
    }

     const getFieldClasses = (fieldName) => {
        return `form-field-input ${touched[fieldName] && (!formData[fieldName] || formData[fieldName] === 0) ? 'error' : ''}`;
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-field">
                    <label htmlFor="hour">Hour:</label>
                    <input type="text" name="hour" onChange={handleChange} placeholder="Hour" className={getFieldClasses('hour')} />
                </div>

                <div className="form-field">
                    <label htmlFor="temperature">Temperature (°C):</label>
                    <input type="text" name="temperature"  onChange={handleChange} placeholder="Temperature(°C)" className={getFieldClasses('temperature')} />
                </div>

                <div className="form-field">
                    <label htmlFor="humidity">Humidity (%):</label>
                    <input type="text" name="humidity"  onChange={handleChange} placeholder="Humidity(%)" className={getFieldClasses('humidity')} />
                </div>

                <div className="form-field">
                    <label htmlFor="windSpeed">Wind Speed (m/s):</label>
                    <input type="text" name="windSpeed"  onChange={handleChange} placeholder="Wind speed (m/s)" className={getFieldClasses('windSpeed')} />
                </div>

                <div className="form-field">
                    <label htmlFor="visibility">Visibility (10m):</label>
                    <input type="text" name="visibility" onChange={handleChange} placeholder="Visibility (10m)" className={getFieldClasses('visibility')} />
                </div>

                <div className="form-field">
                    <label htmlFor="solarRadiation">Solar Radiation (MJ/m2):</label>
                    <input type="text" name="solarRadiation"  onChange={handleChange} placeholder="Solar Radiation (MJ/m2)" className={getFieldClasses('solarRadiation')} />
                </div>

                <div className="form-field">
                    <label htmlFor="rainfall">Rainfall (mm):</label>
                    <input type="text" name="rainfall"  onChange={handleChange} placeholder="Rainfall(mm)" className={getFieldClasses('rainfall')} />
                </div>

                <div className="form-field">
                    <label htmlFor="snowfall">Snowfall (cm):</label>
                    <input type="text" name="snowfall" onChange={handleChange} placeholder="Snowfall (cm)" className={getFieldClasses('snowfall')} />
                </div>

                <div className="form-field">
                    <label htmlFor="seasons">Season:</label>
                    <select name="seasons" value={formData.seasons} onChange={handleChange} className={getFieldClasses('seasons')}>
                        <option value="">Select Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="holiday">Holiday:</label>
                    <select name="holiday" value={formData.holiday} onChange={handleChange} className={getFieldClasses('holiday')}>
                        <option value="">Is it a Holiday?</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="functioningDay">Functioning Day:</label>
                    <select name="functioningDay" value={formData.functioningDay} onChange={handleChange} className={getFieldClasses('functioningDay')}>
                        <option value="">Is it a Functioning Day?</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="day">Day:</label>
                    <input type="text" name="day"  onChange={handleChange} placeholder="Day" className={getFieldClasses('day')} />
                </div>

                <div className="form-field">
                    <label htmlFor="month">Month:</label>
                    <input type="text" name="month"  onChange={handleChange} placeholder="Month" className={getFieldClasses('month')} />
                </div>

                <div className="form-field">
                    <label htmlFor="year">Year:</label>
                    <input type="text" name="year"  onChange={handleChange} placeholder="Year" className={getFieldClasses('year')} />
                </div>

                <div className="form-field">
                    <label htmlFor="weekday">Weekday:</label>
                    <select name="weekday" value={formData.weekday} onChange={handleChange} className={getFieldClasses('weekday')}>
                        <option value="">Select Weekday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
            {isLoading && <div className="loading-overlay"><img src={LoadingGif} alt="Loading..." className="loading-gif"/></div>}
            {result && (
                <div className="result">
                    Result: {result.prediction}
                </div>
            )}
        </>
    );
}

export default DataForm;
