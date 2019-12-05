import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';

import UkCitiesWeather from './components/UkCitiesWeather';
import YourLocation from './components/YourLocations';

export default function App() {
  return (
    <div className="appWrapper">
      <h1>Weather App</h1>
      <YourLocation />
      <UkCitiesWeather />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
