import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.scss';

export default function App() {
  const [city, setCity] = useState('London');
  const [weatherList, setWeatherList] = useState();

  function getData() {
    const token = process.env.REACT_APP_WEATHER_ACCESS_KEY;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
      )
      .then((res) => {
        setWeatherList(res.data.list);
        console.log(res.data);
        console.log(weatherList);
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
      <h1>Hi there</h1>
      <form onSubmit={handleSubmit}>
        <input value={city} onChange={handleCityChange} onKeyDown={keyPress} />
        <button type="submit">Submit</button>
      </form>
      {weatherList && (
        <div>
          <p>{weatherList[0].dt_txt}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherList[0].weather[0].icon}@2x.png`}
            alt="weather logo"
          />
          <p>{weatherList[0].weather[0].description}</p>
          <p>
            {Math.round(weatherList[0].main.temp_min - 273.15)} °C -{' '}
            {Math.round(weatherList[0].main.temp_max - 273.15)}°C
          </p>
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
                  <p>{weather.dt_txt}</p>
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

ReactDOM.render(<App />, document.getElementById('root'));

{
  /* <ul>
{news.articles.filter((article, index) => (index < 5)).map(article => {
  return <li key={article.url}>
    <p src={article.url}>{article.title}</p>
    <a href={article.url}>
      <p>Read Full Story</p>
    </a>
  </li>
})}
</ul> */
}

// `http://openweathermap.org/img/wn/${url}@2x.png`

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       greeting: "hi"
//     };

//     this.getData = this.getData.bind(this);
//   }

//   componentDidMount() {
//     this.getData();
//   }

//   getData() {
//     const token = process.env.REACT_APP_WEATHER_ACCESS_KEY;
//     const city = "London";
//     axios
//       .get(
//         `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
//       )
//       .then(res => console.log(res.data))
//       .catch(err => this.setState({ errorData: err.message }));
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.greeting}</h1>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("root"));

// `api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${token}`
