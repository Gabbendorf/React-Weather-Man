import React from 'react';
import fetchMock from 'fetch-mock';
import WeatherMan from '../../src/components/weatherMan';
import  sinon  from 'sinon';
import { flushPromises } from '../../src/api';

let weatherMan

function cityDataMocked(apiName, apiWeather, apiTemp) {
  let data = {
    name: apiName,
    weather: [ { description: apiWeather } ],
    main: { temp: apiTemp },
  }
  return data;
};

function simulateActionOfAdding(cityChosen) {
  const event = {target: {value: cityChosen}};
  weatherMan.find('.researchCity').simulate('change', event);
  weatherMan.find('.addCity').simulate('submit');
}

beforeEach(() => {
  fetch.mockResponse(JSON.stringify(cityDataMocked("Padua", "sunny", "8.5")), {status: 200});
  weatherMan = mount(<WeatherMan />);
});

test('renders without crashing', () => {
  mount(<WeatherMan />);
})

test('renders a heading with the app name', () => {
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

test('responds to city change', () => {
  const registerCitySpy = sinon.spy(WeatherMan.prototype, "registerCity");
  const weatherMan = mount(
    <WeatherMan />
  )

  const event = {target: {value: "London"}};
  weatherMan.find('.researchCity').simulate('change', event);

  expect(registerCitySpy.called).toEqual(true);
})

test('renders an empty paragraph if no city has been added yet', () => {
  const citiesAddedDetails = weatherMan.find('p');

  expect(citiesAddedDetails.text()).toEqual("");
})

test('gets data from API for a city chose$ and renders its name and temperature without decimals in an unordered list', async () => {
  simulateActionOfAdding("Padua");
  await flushPromises();

  const citiesAddedDetails = weatherMan.find('ul');

  expect(citiesAddedDetails.text()).toEqual("Padua 8°");
})

test('renders name and temperature of multiple cities added in the form of an unordered list', async () => {
  simulateActionOfAdding("Padua");
  await flushPromises();

  fetch.mockResponse(JSON.stringify(cityDataMocked("London", "misty", "-2")), {status: 200});
  simulateActionOfAdding("London")
  await flushPromises();

  const citiesAddedDetails = weatherMan.find('ul');

  expect(citiesAddedDetails.text()).toEqual("Padua 8°London -2°");
})
