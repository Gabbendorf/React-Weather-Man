import React from 'react';
import fetchMock from 'fetch-mock';
import WeatherMan from '../../src/components/weatherMan';
import  sinon  from 'sinon';
import { flushPromises } from '../../src/api';

let weatherMan

function cityDataMocked(apiName, apiWeather, apiTemp) {
  let data = {
    city: {
      name: apiName
    },
    list: fiveDaysWeatherForecast(apiWeather, apiTemp)
  }
  return data;
};

function fiveDaysWeatherForecast(apiWeather, apiTemp) {
  let everySevenHoursForecast = [];
  [...Array(29)].forEach((i) =>
    everySevenHoursForecast.push(
      {
	weather: [ { description: apiWeather } ],
	main: { temp: apiTemp },
	dt_txt: "2018-04-15 15:00:00"
      }
    )
  );
  return everySevenHoursForecast;
}

function simulateActionOfAdding(cityChosen) {
  const event = {target: {value: cityChosen}};
  weatherMan.find('.searchCity').simulate('change', event);
  weatherMan.find('.addCity').simulate('submit');
}

beforeEach(() => {
  fetch.mockResponse(JSON.stringify(cityDataMocked("Padua", "sunny", "8.5")), {status: 200});
  weatherMan = mount(<WeatherMan />);
});

test('renders without crashing', () => {
  mount(<WeatherMan />);
});

test('renders a heading with the app name', () => {
  const heading = weatherMan.find('h1');

  expect(heading.text()).toEqual("Weather Man");
});

test('renders an input element where to search for a city and has an empty value at beginning', () => {
  const input = weatherMan.find('.searchCity');

  expect(input.props().value).toEqual("");
});

test('renders an input element that acts as an Add button', () => {
  const input = weatherMan.find('.addCity');

  expect(input.props().value).toEqual("Add");
});

test('responds to city change', () => {
  const registerCitySpy = sinon.spy(WeatherMan.prototype, "registerCitySearched");
  const weatherMan = mount(
    <WeatherMan />
  )

  const event = {target: {value: "London"}};
  weatherMan.find('.searchCity').simulate('change', event);

  expect(registerCitySpy.called).toEqual(true);
});

test('renders an empty paragraph if no city has been added yet', () => {
  const citiesAddedDetails = weatherMan.find('p');

  expect(citiesAddedDetails.text()).toEqual("");
});

test('gets data from API for a city chosen and renders its name and temperature without decimals in an unordered list', async () => {
  simulateActionOfAdding("Padua");
  await flushPromises();

  const citiesAddedDetails = weatherMan.find('ul');

  expect(citiesAddedDetails.text()).toEqual("Padua 8°C");
});

test('renders name and temperature of multiple cities added in the form of an unordered list', async () => {
  simulateActionOfAdding("Padua");
  await flushPromises();

  fetch.mockResponse(JSON.stringify(cityDataMocked("London", "misty", "-2")), {status: 200});
  simulateActionOfAdding("London")
  await flushPromises();

  const citiesAddedDetails = weatherMan.find('ul');

  expect(citiesAddedDetails.text()).toEqual("Padua 8°CLondon -2°C");
});

test('a city cannot be added twice', async () => {
  simulateActionOfAdding("Padua")
  simulateActionOfAdding("Padua")
  await flushPromises();

  const citiesAdded = weatherMan.find('ul');

  expect(citiesAdded.text()).toEqual("Padua 8°C");
  expect(citiesAdded.text()).not.toEqual("Padua 8°CPadua 8C°");
});

test('clears city field after a search', async () => {
  simulateActionOfAdding("Padua")
  await flushPromises

  const cityField = weatherMan.find('.searchCity');

  expect(cityField.text()).toEqual("");
});
