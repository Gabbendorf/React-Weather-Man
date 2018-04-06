import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from './api';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityChosen: "",
      weather: "",
      cityName: "",
    }
    this.registerCity = this.registerCity.bind(this);
    this.registerData = this.registerData.bind(this);
  }

  registerCity(event) {
    this.setState({
      cityChosen: event.target.value,
    })
  }

  registerData() {
    getDataFor(this.state.cityChosen)
      .then(data => {
 	this.setState({
	  weather: data.weather[0].description,
	  cityName: data.name,
	})
      });
  }

  weatherForecast() {
    if (this.state.weather != "") {
      return `The weather in ${this.state.cityName} now is: ${this.state.weather}`;
    }
    return "";
  }

  render() {
    return (
      <div>
        <h1>How is the weather now in:</h1>
        <input type="text" value={this.state.cityChosen} onChange={this.registerCity} autoFocus="autofocus" />
        <button onClick={this.registerData}>Submit</button>
        <p>{this.weatherForecast()}</p>
      </div>
    );
  }
};

export { WeatherMan }
