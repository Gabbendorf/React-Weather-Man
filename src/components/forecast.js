import React from "react"
import ReactDOM from "react-dom"
import { Day } from "./Day"

export function Forecast(props) {
  const allForecast = props.fiveDaysDetails.map(currentDay => (
    <Day
      key={currentDay.weekDay}
      weekDay={currentDay.weekDay}
      description={currentDay.description}
      temperature={currentDay.temperature}
    />
  ))

  return <ul className="five-days-weather-forecast">{allForecast}</ul>
}
