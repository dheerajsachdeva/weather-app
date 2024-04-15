import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


interface RouteParams {
    city: string;
    [key: string]: string; 
}

interface Weather {
    list: {
      main: {
        temp: number;
        humidity: number;
        pressure: number;
      };
      weather: {
        description: string;
      }[];
    }[];
     wind: {
      speed: number;
    };
}

const WeatherPage: React.FC = () => {
    const params = useParams<RouteParams>();
    const { city } = params;
    const [weather, setWeather] = useState<Weather | null>(null);
    const [alertShown, setAlertShown] = useState(false); 
    const API_KEY='eea658cc8eaa6cce40034ab9ee8cbd5f'

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (!city) {
                    return;
                }
    
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
                console.log('Weather data:', response.data);
                setWeather(response.data);
            } catch (error: any) {
                console.error('Error fetching weather:', error);
                if (error.response && error.response.status === 404 && !alertShown) {
                   alert("City not found");
                    setAlertShown(true); 
                    window.location.href = "/";
                }
            }
        };
    
        fetchWeather();
    }, [city, alertShown]);

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Weather for {city}</h2>
            <table className="weather-table"> 
              <thead>
                <tr>
                  <th>Temperature (°C)</th>
                  <th>Description</th>
                  <th>Humidity (%)</th>
                  <th>Wind Speed (m/s)</th>
                  <th>Pressure (hPa)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{(weather.list[0].main.temp - 273.15).toFixed(2)}</td>
                  <td>{weather.list[0].weather[0].description}</td>
                  <td>{weather.list[0].main.humidity}</td>
                  <td>{weather.list[0].main.humidity}</td>
                  <td>{weather.list[0].main.pressure}</td>
                </tr>
              </tbody>
            </table>
        </div>
    );
};

export default WeatherPage;
