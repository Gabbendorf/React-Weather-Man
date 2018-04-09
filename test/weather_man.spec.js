import React from 'react';
import fetchMock from 'fetch-mock';
import { WeatherMan } from '../src/weather_man';
import  sinon  from 'sinon';
import { flushPromises } from '../src/api';

let weatherMan

beforeEach(() => {
  fetch.mockResponse(JSON.stringify({name: "Padua", weather: [{description: "sunny"}]}), {status: 200});
  weatherMan = mount(<WeatherMan />);
});

test('renders without crashing', () => {
  mount(<WeatherMan />);
})

test('renders a heading', () => {
  const heading = weatherMan.find('h1');

  expect(heading.text()).toEqual("Weather Man");
})

test('renders an input element where to search for a city and has an empty value at beginning', () => {
  const input = weatherMan.find('.researchCity');

  expect(input.props().value).toEqual("");
})

test('renders an input element that acts as an Add button', () => {
  const input = weatherMan.find('.addCity');

  expect(input.props().value).toEqual("Add");
})

test('renders an empty paragraph for weather forecast at beginning', () => {
  const weatherForecast = weatherMan.find('p');

  expect(weatherForecast.text()).toEqual("");
})

test('responds to city change', () => {
  const registerCitySpy = sinon.spy(WeatherMan.prototype, "registerCity");
  const weatherMan = mount(
    <WeatherMan />
  )

  const event = {target: {value: "London"}};
  weatherMan.find('.researchCity').simulate('change', event);

  expect(registerCitySpy.called).toEqual(true);
})

test('gets data for a certain city from API and renders a paragraph with updated weather forecast', async () => {
    const event = {target: {value: "Padua"}};
    weatherMan.find('.researchCity').simulate('change', event);
    weatherMan.find('.addCity').simulate('submit');
    await flushPromises();

    const weatherForecast = weatherMan.find('p');

    expect(weatherForecast.text()).toEqual("The weather in Padua now is: sunny");
})
