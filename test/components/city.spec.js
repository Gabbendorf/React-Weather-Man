import React from 'react';
import City from '../../src/components/city';

let city

beforeEach(() => {
  city = mount(<City name="Padua" weather="sunny" temperature="8°" />);
});

test('renders without crashing', () => {
  mount(<City name="Padua" weather="sunny" temperature="8" />);
});

test('renders its name and temperature if user did not click on it', () => {
  const details = city.find('.onlyTodayDetails')

  expect(details.text()).toEqual("Padua 8°");
});

test('renders its name and temperature as headings if user clicks on it', () => {
  city.find('li').simulate('click');
  const moreDetails = city.find('.fiveDaysDetails');

  expect(moreDetails.find('h2').text()).toEqual("Padua");
  expect(moreDetails.find('h1').text()).toEqual("8°");
});

test('renders weather and temperature for 5 following days as unordered list if user clicks on it', () => {
  city.find('li').simulate('click');
  const moreDetails = city.find('.fiveDaysDetails');

  expect(moreDetails.find('li').text()).toEqual("Today sunny 8°");
});

test('reverts to rendering just name and temperature if user clicks again on it', () => {
  city.find('.onlyTodayDetails').simulate('click');
  city.find('.fiveDaysDetails').simulate('click');

  const details = city.find('li')

  expect(details.text()).toEqual("Padua 8°");
});
