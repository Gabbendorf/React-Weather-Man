import React from 'react';
import ReactDOM from 'react-dom';
import { WeatherMan } from './weather_man';

ReactDOM.render(
  <WeatherMan city="padova"/>,
  document.getElementById('app')
);
