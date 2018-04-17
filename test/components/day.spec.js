import React from 'react';
import Day from '../../src/components/day';

test('renders without crashing', () => {
  mount(<Day weekDay="Sunday" description="sunny" temperature="8°" />);
});

test('renders all details for the day', () => {
  const day = mount(<Day weekDay="Sunday" description="sunny" temperature="8°" />);

  const details = day.find('li')

  expect(details.find('.weekDay').text()).toEqual("Sunday");
  expect(details.find('.weatherDescriptionForDay').text()).toEqual("sunny");
  expect(details.find('.temperatureForDay').text()).toEqual("8°");
});
