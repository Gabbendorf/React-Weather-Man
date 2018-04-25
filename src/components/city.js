import React from "react"
import ReactDOM from "react-dom"
import Forecast from "./forecast"

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
      <div className="fullDetails">
        <h1 className="cityNameFullDetails">{this.props.name}</h1>
        <p className="currentTemperatureFullDetails">
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
      <div className="onlyTodayDetails">
        <h1 className="cityName">{this.props.name}</h1>
        <p className="currentTemperature">{this.state.currentTemperature}</p>
      </div>
    )
  }

  render() {
    return <li onClick={this.registerClick}>{this.detailsToShow()}</li>
  }
}
