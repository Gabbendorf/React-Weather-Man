import React from "react"
import ReactDOM from "react-dom"
export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export class Day extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const currentWeekDay = weekDays[new Date().getDay()]
    let weekDay = this.props.weekDay
    if (weekDay === currentWeekDay) {
      weekDay += ", today"
    }

    return (
      <li>
        <span className="weekDay">{weekDay}</span>
        <span className="weatherDescriptionForDay">
          {this.props.description}
        </span>
        <span className="temperatureForDay">{this.props.temperature}</span>
      </li>
    )
  }
}
