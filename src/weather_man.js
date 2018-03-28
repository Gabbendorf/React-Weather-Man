import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const APIKey = '&APPID=81ebd306a97bf6e5342257562b958514';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      city: "",
      weather: "",
    }
  }

  getDataFor(city) {
    const url = rootUrl + city + APIKey;
    return fetch(url)
      .then(response => {
	return response.json();
      });
  }

  componentWillMount() {
    this.getDataFor(this.props.city)
      .then(data => {
	this.setState({
	  city: data.name,
	  weather: data.weather[0].description,
	});
      });
  }

  render() {
    return (
      <div>
        <h1>The weather in {this.state.city} today is: {this.state.weather}</h1>
      </div>
    );
  }
};


export { WeatherMan }
