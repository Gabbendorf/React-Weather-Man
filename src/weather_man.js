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

  registerData(event) {
    event.preventDefault();
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
	<form onSubmit={this.registerData}>
	  <label>
	    <h1>How is the weather now in</h1>
	    <input className="cityChosen" value={this.state.cityChosen} onChange={this.registerCity} autoFocus="autofocus" />
	  </label>
	  <input className="submitInput" type="submit" value="Submit" />
	</form>
	<p>{this.weatherForecast()}</p>
      </div>
    );
  }
}

export { WeatherMan }
