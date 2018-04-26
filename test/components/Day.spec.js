import React from "react"
import { Day, weekDays } from "../../src/components/Day"

test("renders without crashing", () => {
  mount(<Day weekDay="Sunday" description="sunny" temperature="8°" />)
})

test("renders all details for the day", () => {
  const day = mount(
    <Day weekDay="Sunday" description="sunny" temperature="8°" />
  )

  const details = day.find("li")

  expect(details.find(".week-day").text()).toEqual("Sunday")
  expect(details.find(".weather-description-for-day").text()).toEqual("sunny")
  expect(details.find(".temperature-for-day").text()).toEqual("8°")
})

test("it specifies it is today if week day is current week day", () => {
  const currentWeekDay = weekDays[new Date().getDay()]
  const day = mount(
    <Day weekDay={currentWeekDay} description="sunny" temperature="8°" />
  )

  const todaysDetails = day.find("li").find(".week-day")

  expect(todaysDetails.text()).toEqual(currentWeekDay + ", today")
})
