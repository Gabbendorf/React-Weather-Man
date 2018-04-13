import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from './forecast';

export default class City extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      currentTemperature: props.weatherForecast[0].temperature,
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
          {this.state.currentTemperature}
        </h1>
        <Forecast fiveDaysDetails={this.props.weatherForecast} />
      </div>
    );
  }

  detailsToShow() {
    return (
      this.state.clicked ? (
	this.fiveDaysDetails()
      ) : (
	<div className="onlyTodayDetails">
  	  {this.props.name} {this.state.currentTemperature}
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
