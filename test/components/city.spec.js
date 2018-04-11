import React from 'react';
import City from '../../src/components/city';
import fetchMock from 'fetch-mock';
import { flushPromises } from '../../src/api';

let city
function cityDataMocked(apiName, apiWeather, apiTemp) {
  let data = {
    name: apiName,
    weather: [ { description: apiWeather } ],
    main: { temp: apiTemp },
  }
  return data;
};

beforeEach(() => {
  fetch.mockResponse(JSON.stringify(cityDataMocked("Padua", "sunny", "8.5")), {status: 200});
  city = mount(<City userChoice="Padua"/>);
});

test('renders without crashing', () => {
  mount(<City />);
});

test('gets name and temperature without decimals for a city chosen by user from api and renders a paragraph with all details', () => {
  const paragraph = city.find('p')

  expect(paragraph.text()).toEqual("Padua 8°");
});
