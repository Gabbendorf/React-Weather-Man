import React from 'react';
import Day from '../../src/components/day';

test('renders without crashing', () => {
  mount(<Day weekDay="Sunday" description="sunny" temperature="8°" />);
});

test('renders all details for the day', () => {
  const day = mount(<Day weekDay="Sunday" description="sunny" temperature="8°" />);

  const details = day.find('li')


  expect(details.text()).toEqual("Sunday sunny 8°");
});
