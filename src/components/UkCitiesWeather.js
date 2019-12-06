import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UkCitiesWeather() {
  const [ukCities, setUkCities] = useState([
    'London',
    'Edinburgh',
    'Cardiff',
    'Belfast'
  ]);
  const [ukCitiesWeather, setUkCitiesWeather] = useState([]);
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
    let updatedCurrentUkCitiesWeather = ukCitiesWeather;
    ukCities.map((ukCity) =>
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${ukCity}&APPID=${token}`
        )
        .then((res) => {
          updatedCurrentUkCitiesWeather = updatedCurrentUkCitiesWeather.concat(
            res.data
          );
          setUkCitiesWeather(updatedCurrentUkCitiesWeather);
        })
        .catch((err) => console.log(err.message))
    );
  }

  useEffect(() => {
    getData();
  }, []);

  function handleRefresh() {
    setUkCities([]);
    setUkCitiesWeather([]);
  }

  return (
    <div className="ukCitiesWeatherWrapper">
      {ukCitiesWeather && (
        <div className="citiesWeatherWrapper">
          {ukCitiesWeather.map((cityWeather) => {
            return (
              <div className="cityWeatherWrapper" key={cityWeather.city.id}>
                <h4>{cityWeather.city.name}</h4>
                <ul>
                  {cityWeather.list
                    .filter(
                      (weather) =>
                        weather.dt === cityWeather.list[0].dt ||
                        weather.dt === cityWeather.list[0].dt + 86400 ||
                        weather.dt === cityWeather.list[0].dt + 86400 * 2
                    )
                    .map((weather) => {
                      return (
                        <li key={weather.dt}>
                          <p>{weekday[new Date(weather.dt * 1000).getDay()]}</p>
                          <img
                            src={`https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="weather logo"
                          />
                          <p>{weather.weather[0].description}</p>
                          {Math.round(weather.main.temp_min - 273.15) ===
                          Math.round(weather.main.temp_max - 273.15) ? (
                            <p>
                              {Math.round(weather.main.temp_max - 273.15)}°C
                            </p>
                          ) : (
                            <p>
                              {Math.round(weather.main.temp_min - 273.15)} °C-
                              {'  '}
                              {Math.round(
                                weather.main.temp_max - 273.15
                              )}°C{' '}
                            </p>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
      <button type="button" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
}
