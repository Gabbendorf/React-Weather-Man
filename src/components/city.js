import React from "react"
import ReactDOM from "react-dom"
import Forecast from "./Forecast"

export default class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      currentTemperature: props.weatherForecast[0].temperature
    }
    this.registerClick = this.registerClick.bind(this)
  }

  registerClick() {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }))
  }

  fiveDaysDetails() {
    return (
      <div className="full-details">
        <h1 className="city-name-full-details">{this.props.name}</h1>
        <p className="current-temperature-full-details">
          {this.state.currentTemperature}
        </p>
        <Forecast fiveDaysDetails={this.props.weatherForecast} />
      </div>
    )
  }

  detailsToShow() {
    return this.state.clicked ? (
      this.fiveDaysDetails()
    ) : (
      <div className="only-today-details">
        <h1 className="city-name">{this.props.name}</h1>
        <p className="current-temperature">{this.state.currentTemperature}</p>
      </div>
    )
  }

  render() {
    return <li onClick={this.registerClick}>{this.detailsToShow()}</li>
  }
}
