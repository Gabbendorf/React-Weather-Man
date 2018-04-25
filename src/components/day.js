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
        <span className="week-day">{weekDay}</span>
        <span className="weather-description-for-day">
          {this.props.description}
        </span>
        <span className="temperature-for-day">{this.props.temperature}</span>
      </li>
    )
  }
}
