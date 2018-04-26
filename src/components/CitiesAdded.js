import React from "react"
import ReactDOM from "react-dom"
import City from "./City"

function noCitiesAddedYet(props) {
  return props.citiesDetails.length === 0
}

export function CitiesAdded(props) {
  const citiesAdded = noCitiesAddedYet(props) ? (
    <p />
  ) : (
    props.citiesDetails.map(cityDetails => (
      <City
        name={cityDetails.city.name}
        weatherForecast={cityDetails.city.fiveDaysWeatherForecast}
        key={cityDetails.city.name}
      />
    ))
  )

  return <ul className="cities-added-list">{citiesAdded}</ul>
}
