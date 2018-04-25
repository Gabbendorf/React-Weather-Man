import React from "react"
import CitiesAdded from "../../src/components/citiesAdded"

let citiesAdded

const citiesDetails = [
  {
    city: {
      name: "Rome",
      fiveDaysWeatherForecast: [
        {
          weekDay: "Monday",
          description: "sunny",
          temperature: "8°"
        }
      ]
    }
  },
  {
    city: {
      name: "Paris",
      fiveDaysWeatherForecast: [
        {
          weekDay: "Monday",
          description: "rainy",
          temperature: "3°"
        }
      ]
    }
  }
]

beforeEach(() => {
  citiesAdded = mount(<CitiesAdded citiesDetails={citiesDetails} />)
})

test("renders without crashing", () => {
  mount(<CitiesAdded citiesDetails={citiesDetails} />)
})

test("renders an empty paragraph if it does not receive details for a city to add", () => {
  const citiesAdded = mount(<CitiesAdded citiesDetails={[]} />)
  const paragraph = citiesAdded.find("p")

  expect(paragraph.text()).toEqual("")
})

test("renders unordered list of cities with their name and temperature", () => {
  const firstCityDetails = citiesAdded
    .find(".citiesAddedList")
    .find("li")
    .at(0)
  const secondCityDetails = citiesAdded
    .find(".citiesAddedList")
    .find("li")
    .at(1)

  expect(firstCityDetails.text()).toEqual("Rome8°")
  expect(secondCityDetails.text()).toEqual("Paris3°")
})
