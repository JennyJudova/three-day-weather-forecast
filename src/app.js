import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.scss';

import UkCitiesWeather from './components/UkCitiesWeather';
import YourLocation from './components/YourLocations';
import RefreshButton from './components/RefreshButton';

export default function App() {
  return (
    <div>
      <h1>Weather App</h1>
      <UkCitiesWeather />
      <RefreshButton />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// <YourLocation />
