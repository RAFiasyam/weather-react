import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9c503b028748d1e120c892a094dee3d8`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='flex flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-row gap-3'>
        <input
          type="text"
          placeholder="Enter name of the area"
          value={city}
          class="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />
        <button type="submit" className='btn btn-success text-white'>Get Weather</button>
      </form>
      <div>
        {weatherData ? (
          <>
            <div class="card bg-primary text-white w-96 shadow-xl">
              <div class="card-body">
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Weather; 
