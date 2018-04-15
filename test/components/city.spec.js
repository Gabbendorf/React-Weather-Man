import React from 'react';
import City from '../../src/components/city';

let city

const weatherForecast = [
  {
    weekDay: "Sunday",
    description: "sunny",
    temperature: "24°"
  },
  {
    weekDay: "Monday",
    description: "less sunny",
    temperature: "22°"
  }
];

beforeEach(() => {
  city = mount(<City name="Padua" weatherForecast={weatherForecast} />);
});

test('renders without crashing', () => {
  mount(<City name="Padua" weatherForecast={weatherForecast} />);
});

test('renders its name and temperature if user did not click on it', () => {
  const details = city.find('.onlyTodayDetails')

  expect(details.text()).toEqual("Padua 24°");
});

test('renders its name and temperature as headings if user clicks on it', () => {
  city.find('li').simulate('click');
  const moreDetails = city.find('.fiveDaysDetails');

  expect(moreDetails.find('h2').text()).toEqual("Padua");
  expect(moreDetails.find('h1').text()).toEqual("24°");
});

test('renders weather and temperature for all days as unordered list if user clicks on it', () => {
  city.find('li').simulate('click');
  const moreDetails = city.find('.fiveDaysDetails');

  expect(moreDetails.find('li').at(0).text()).toEqual("Sunday sunny 24°");
  expect(moreDetails.find('li').at(1).text()).toEqual("Monday less sunny 22°");
});

test('reverts to rendering just name and temperature if user clicks again on it', () => {
  city.find('.onlyTodayDetails').simulate('click');
  city.find('.fiveDaysDetails').simulate('click');

  const details = city.find('li')

  expect(details.text()).toEqual("Padua 24°");
});
