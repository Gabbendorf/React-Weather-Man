import React from "react"
import City from "../../src/components/City"

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
]

beforeEach(() => {
  city = mount(<City name="Padua" weatherForecast={weatherForecast} />)
})

test("renders without crashing", () => {
  mount(<City name="Padua" weatherForecast={weatherForecast} />)
})

test("renders its name and temperature if user did not click on it", () => {
  const details = city.find(".only-today-details")

  expect(details.text()).toEqual("Padua24°")
})

test("renders its name as heading and temperature as paragraph if user clicks on it", () => {
  city.find("li").simulate("click")
  const moreDetails = city.find(".full-details")

  expect(moreDetails.find("h1").text()).toEqual("Padua")
  expect(moreDetails.find("p").text()).toEqual("24°")
})

test("renders weather and temperature for all days as unordered list if user clicks on it", () => {
  city.find("li").simulate("click")
  const moreDetails = city.find(".full-details")

  expect(
    moreDetails
      .find("li")
      .at(0)
      .text()
  ).toEqual("Sundaysunny24°")
  expect(
    moreDetails
      .find("li")
      .at(1)
      .text()
  ).toEqual("Mondayless sunny22°")
})

test("reverts to rendering just name and temperature if user clicks again on it", () => {
  city.find(".only-today-details").simulate("click")
  city.find(".full-details").simulate("click")

  const details = city.find("li")

  expect(details.text()).toEqual("Padua24°")
})
