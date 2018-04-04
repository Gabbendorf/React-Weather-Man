import React from 'react';
import fetchMock from 'fetch-mock';
import { WeatherMan } from '../src/weather_man';
import { flushPromises } from '../src/api';

let weatherMan

beforeEach(() => {
  fetch.mockResponse(JSON.stringify({name: "Padua", weather: [{description: "sunny"}]}), {status: 200});
  weatherMan = mount(<WeatherMan />);
});

test('renders without crashing', () => {
  mount(<WeatherMan />);
})

test('renders a heading with hardcoded state values for city and weather without API call', () => {
  weatherMan.setState({city: "Padua", weather: "sunny"})

  const h1 = weatherMan.find("h1");

  expect(h1.text()).toEqual("The weather in Padua today is: sunny");
})

test('renders a heading for the weather of Padua after getting data from API', () => {
  return flushPromises().then(() => {
    expect(weatherMan.find("h1").text()).toEqual("The weather in Padua today is: sunny");
  });
})
