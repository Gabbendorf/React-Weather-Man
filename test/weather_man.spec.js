import React from 'react'
import { WeatherMan } from '../src/weather_man'

test('renders without crashing', () => {
  mount(<WeatherMan city="London"/>);
})
