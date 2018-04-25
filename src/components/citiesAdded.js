import React from "react"
import ReactDOM from "react-dom"
import City from "./City"

export default class CitiesAdded extends React.Component {
  constructor(props) {
    super(props)
  }

  noCitiesAddedYet() {
    return this.props.citiesDetails.length === 0
  }

  render() {
    const citiesAdded = this.noCitiesAddedYet() ? (
      <p />
    ) : (
      this.props.citiesDetails.map(cityDetails => (
        <City
          name={cityDetails.city.name}
          weatherForecast={cityDetails.city.fiveDaysWeatherForecast}
          key={cityDetails.city.name}
        />
      ))
    )

    return <ul className="cities-added-list">{citiesAdded}</ul>
  }
}
