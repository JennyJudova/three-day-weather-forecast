import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

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
