import React from 'react';
import Forecast from '../../src/components/forecast';

const fiveDaysDetails = [
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

test('renders without crashing', () => {
  mount(<Forecast fiveDaysDetails={fiveDaysDetails} />);
});

test('renders week day, weather description and temperature for all days', () => {
  const forecast = mount(<Forecast fiveDaysDetails={fiveDaysDetails} />);

  const sundayDetails = forecast.find('li').at(0);
  const mondayDetails = forecast.find('li').at(1);

  expect(sundayDetails.text()).toEqual("Sundaysunny24°");
  expect(mondayDetails.text()).toEqual("Mondayless sunny22°");
});
