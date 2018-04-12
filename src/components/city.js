import React from 'react';
import ReactDOM from 'react-dom';

export default class City extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    }
    this.registerClick = this.registerClick.bind(this);
  }

  registerClick() {
    this.setState( prevState => ({
      clicked: !prevState.clicked,
    }));
  }

  fiveDaysDetails() {
    return (
      <div className="fiveDaysDetails">
        <h2 className="cityName">{this.props.name}</h2>
        <h1 className="cityTemperature">
          {this.props.temperature}
        </h1>
        <ul>
          <li>Today {this.props.weather} {this.props.temperature}</li>
        </ul>
      </div>
    );
  }

  detailsToShow() {
    return (
      this.state.clicked ? (
	this.fiveDaysDetails()
      ) : (
	<div className="onlyTodayDetails">
	  {this.props.name} {this.props.temperature}
        </div>
      )
    );
  }

  render() {
    return (
      <li onClick={this.registerClick}>
        {this.detailsToShow()}
      </li>
    );
  }
}
