import React from "react"
import ReactDOM from "react-dom"
import { Day } from "./day"

export default class Forecast extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const allForecast = this.props.fiveDaysDetails.map(currentDay => (
      <Day
        key={currentDay.weekDay}
        weekDay={currentDay.weekDay}
        description={currentDay.description}
        temperature={currentDay.temperature}
      />
    ))

    return <ul className="five-days-weather-forecast">{allForecast}</ul>
  }
}
