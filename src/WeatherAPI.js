import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./WeatherApi.css"
const API_KEY = '7d888618e8c1a5f4afaead050a345b88';


const WeatherApp = () => {
  const [locationName, setLocationName] = useState('Lahore');
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
  const [error, setError] = useState('');

  const fetchAPIResponse = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching API response:', error);
      setError('Could not connect to API');
      return null;
    }
  };

  const getLocationData = async (locationName) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName.replace(
      ' ',
      '+'
    )}&count=10&language=en&format=json`;
    const data = await fetchAPIResponse(url);
    if (data && data.results && data.results.length > 0) {
      setLocationData(data.results[0]);
      return data.results[0];
    } else {
      setError('Location not found');
      return null;
    }
  };

  const getWeatherData = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    const data = await fetchAPIResponse(url);
    setWeatherData(data);
    return data;
  };

  const updateWeatherInfo = async () => {
    if (!locationName) {
      setError('Please enter a location name');
      return;
    }

    let location = await getLocationData(locationName);
    if (!location) {
      return;
    }

    const { latitude, longitude } = location;
    const weather = await getWeatherData(latitude, longitude);

    if (weather) {
      const { main, sys } = weather;
      setCurrentTemperature((main.temp - 273.15).toFixed(2));
      setMinTemperature((main.temp_min - 273.15).toFixed(2));
      setMaxTemperature((main.temp_max - 273.15).toFixed(2));

      const sunriseTimestamp = sys.sunrise * 1000;
      const sunsetTimestamp = sys.sunset * 1000;
      setSunriseTime(new Date(sunriseTimestamp).toLocaleTimeString());
      setSunsetTime(new Date(sunsetTimestamp).toLocaleTimeString());

      setError(''); // Clear any previous errors
    } else {
      setError('Could not fetch weather data');
    }
  };

  useEffect(() => {
    updateWeatherInfo();
  }, []); // Call updateWeatherInfo on component mount

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleButtonClick = () => {
    updateWeatherInfo();
  };

  return (
    <div className="container">
      <div className="weatherHeader">
        Weather Forecast
      </div>
      <div className="line CurrentTemp">
        <div className="box">{currentTemperature && `Current Temperature: ${currentTemperature}°C`}</div>
      </div>
      <div className="line">
        <div className="box">{minTemperature && `Min Temperature: ${minTemperature}°C`}</div>
        <div className="box">{sunsetTime && `Sunset Time: ${sunsetTime}`}</div>
      </div>
      <div className="line">
      <div className="box">{maxTemperature && `Max Temperature: ${maxTemperature}°C`}</div>
        <div className="box">{sunriseTime && `Sunrise Time: ${sunriseTime}`}</div>
      </div>
      <div className="line">
      <div className='Location-Box'>
  {/* The image is set in the CSS, no need for <img> tag here */}
              </div>
        <input
          type="text"
          className='Input'
          value={locationName}
          onChange={handleLocationChange}
          placeholder="Enter Your City Name"
        />
        <div className="button-container">
          <button className="button" onClick={handleButtonClick}>Apply</button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherApp;
