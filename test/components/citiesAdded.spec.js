import React from 'react';
import CitiesAdded from '../../src/components/citiesAdded';

let citiesAdded
const citiesDetails = [{city: {
    name: "Rome",
    temperature: "8°"
  }},
    {city: {
      name: "Paris",
      temperature: "2°"
    }}
  ]

beforeEach(() => {
    citiesAdded = mount(<CitiesAdded citiesDetails={citiesDetails}/>);
});

test('renders without crashing', () => {
  mount(<CitiesAdded citiesDetails={citiesDetails}/>);
});

test('renders unordered list of cities with their name and temperature', () => {
  const firstCityDetails = citiesAdded.find('ul').find('li').at(0);
  const secondCityDetails = citiesAdded.find('ul').find('li').at(1);

  expect(firstCityDetails.text()).toEqual("Rome 8°");
  expect(secondCityDetails.text()).toEqual("Paris 2°");
});
