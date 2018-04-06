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

  expect(heading.text()).toEqual("How is the weather now in:");
})

test('renders a Submit button', () => {
  const button = weatherMan.find('button');

  expect(button.text()).toEqual("Submit");
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
  weatherMan.find('input').simulate('change', event);

  expect(registerCitySpy.called).toEqual(true);
})

test('gets data for a certain city from API and renders a paragraph with updated weather forecast', async () => {
    const event = {target: {value: "Padua"}};
    weatherMan.find('input').simulate('change', event);
    weatherMan.find('button').simulate('click');
    await flushPromises();

    const weatherForecast = weatherMan.find('p');

    expect(weatherForecast.text()).toEqual("The weather in Padua now is: SUNNY");
})
