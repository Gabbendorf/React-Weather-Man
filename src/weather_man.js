import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from './api';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      city: "",
      weatherForecast: "",
    }
    this.registerCity = this.registerCity.bind(this);
    this.updateWeatherForecast = this.updateWeatherForecast.bind(this);
  }

  registerCity(event) {
    this.setState({
      city: event.target.value,
    })
  }

  updateWeatherForecast() {
    getDataFor(this.state.city)
      .then(data => {
	this.setState({
	  weatherForecast: "The weather in " + this.state.city + " now is: " + data.weather[0].description.toUpperCase(),
	})
      })
  }

  render() {
    return (
      <div>
        <h1>How is the weather now in:</h1>
        <input type="text" value={this.state.city} onChange={this.registerCity} autoFocus="autofocus" />
        <button onClick={this.updateWeatherForecast}>Submit</button>
        <p>{this.state.weatherForecast}</p>
      </div>
    );
  }
};

export { WeatherMan }
