import React from 'react';
import ReactDOM from 'react-dom';

export default class Day extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>
        <span className="weekDay">{this.props.weekDay}</span>
        <span className="weatherDescriptionForDay">{this.props.description}</span>
        <span className="temperatureForDay">{this.props.temperature}</span>
      </li>
    )
  }
}
