import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourLocation() {
  const [city, setCity] = useState();
  const [weatherList, setWeatherList] = useState();
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  function getData() {
    const token = process.env.REACT_APP_WEATHER_ACCESS_KEY;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
      )
      .then((res) => {
        setWeatherList(res.data.list);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getData();
  }, []);

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getData();
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={city} onChange={handleCityChange} onKeyDown={keyPress} />
        <button type="submit">Search</button>
      </form>
      <div className="weatherNowWrapper">
        {weatherList && (
          <div className="weatherNow">
            <h3>Weather Now in {city}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${weatherList[0].weather[0].icon}@2x.png`}
              alt="weather logo"
            />
            <p>{weatherList[0].weather[0].description}</p>
            {Math.round(weatherList[0].main.temp_min - 273.15) ===
            Math.round(weatherList[0].main.temp_max - 273.15) ? (
              <p>{Math.round(weatherList[0].main.temp_max - 273.15)}°C</p>
            ) : (
              <p>
                {Math.round(weatherList[0].main.temp_min - 273.15)} °C -{' '}
                {Math.round(weatherList[0].main.temp_max - 273.15)}°C{' '}
              </p>
            )}
            <div className="weatherExtra">
              <p>Wind: {Math.round(weatherList[0].wind.speed * 2.2)}mph</p>
              <p>Humidity: {weatherList[0].main.humidity}%</p>
              <p>Pressure: {weatherList[0].main.pressure}mb</p>
            </div>
          </div>
        )}
        {weatherList && (
          <ul>
            {weatherList
              .filter(
                (weather) =>
                  weather.dt === weatherList[0].dt + 86400 ||
                  weather.dt === weatherList[0].dt + 86400 * 2 ||
                  weather.dt === weatherList[0].dt + 86400 * 3
              )
              .map((weather) => {
                return (
                  <li key={weather.dt}>
                    <p>{weekday[new Date(weather.dt * 1000).getDay()]}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="weather logo"
                    />
                    <p>{weather.weather[0].description}</p>
                    {Math.round(weather.main.temp_min - 273.15) ===
                    Math.round(weather.main.temp_max - 273.15) ? (
                      <p>{Math.round(weather.main.temp_max - 273.15)}°C</p>
                    ) : (
                      <p>
                        {Math.round(weather.main.temp_min - 273.15)} °C -{' '}
                        {Math.round(weather.main.temp_max - 273.15)}°C{' '}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
