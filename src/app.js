import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

import Greeting from './components/Greeting';
import UkCitiesWeather from './components/UkCitiesWeather';
import YourLocation from './components/YourLocations';
import RefreshButton from './components/RefreshButton';

export default function App() {
  return (
    <div>
      <h1>Weather App</h1>
      <Greeting />
      <UkCitiesWeather />
      <RefreshButton />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// <YourLocation />
