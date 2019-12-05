import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourLocation() {
  const [city, setCity] = useState('London');
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
    console.log('get data 1 location');
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
    console.log('use effect 1 location');
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
        <button type="submit">Submit</button>
      </form>
      {weatherList && (
        <div>
          <p>Weather Now</p>
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
  );
}
