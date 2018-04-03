import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from './api';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      city: "",
      weather: "",
      message: "",
    }
    this.registerCity = this.registerCity.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  registerCity(event) {
    this.setState({
      city: event.target.value,
    })
  }

  registerData() {
    getDataFor(this.state.city)
      .then(data => {
	this.setState({
	  city: data.name,
	  weather: data.weather[0].description,
	})
      });
  }

  updateMessage() {
    this.registerData();
    this.setState({
      message: "The weather in " + this.state.city + " now is: " + this.state.weather
    })
  }

  render() {
    return (
      <div>
        <label>
          <h1>How is the weather now in:</h1>
          <input type="text" value={this.state.city} onChange={this.registerCity} autoFocus="autofocus" />
        </label>
        <button onClick={this.updateMessage}>Submit</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
};

export { WeatherMan }
