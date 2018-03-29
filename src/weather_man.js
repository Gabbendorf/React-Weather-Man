import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from './api';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      city: "",
      weather: "",
    }
  }

  componentDidMount() {
    getDataFor(this.props.city)
      .then(data => {
	this.setState({
	  city: data.name,
	  weather: data.weather[0].description,
	});
      });
  }

  render() {
    return (
      <h1>The weather in {this.state.city} today is: {this.state.weather}</h1>
    );
  }
};

export { WeatherMan }
