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

export function Day(props) {
  const currentWeekDay = weekDays[new Date().getDay()]
  let weekDay = props.weekDay
  if (weekDay === currentWeekDay) {
    weekDay += ", today"
  }

  return (
    <li>
      <span className="week-day">{weekDay}</span>
      <span className="weather-description-for-day">{props.description}</span>
      <span className="temperature-for-day">{props.temperature}</span>
    </li>
  )
}
