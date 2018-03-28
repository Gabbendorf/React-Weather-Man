import React from 'react';
import fetchMock from 'fetch-mock';
import { WeatherMan } from '../src/weather_man';

export const dataForPadovaPromised = {
  city: "Padua",
  weather: "sunny"
}

test('renders without crashing', () => {
  mount(<WeatherMan city="London"/>);
})

test('checks API is called', () => {
  const weatherMan = new WeatherMan();
  fetchMock.get("*", dataForPadovaPromised);

  weatherMan.getDataFor("padova")
    .then(dataForPadovaReceived => {
      expect(dataForPadovaReceived).toEqual(dataForPadovaPromised);
    });

  fetchMock.restore();
})
