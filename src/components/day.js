import React from 'react';
import ReactDOM from 'react-dom';

export default class Day extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>{this.props.weekDay} {this.props.description} {this.props.temperature}</li>
    )
  }
}
