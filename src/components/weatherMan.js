import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from '../api';
import CitiesAdded from './citiesAdded';

export default class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityChosen: "",
      citiesDetails: [],
    }
    this.registerCity = this.registerCity.bind(this);
    this.registerDetails = this.registerDetails.bind(this);
  }

  registerCity(event) {
    this.setState({
      cityChosen: event.target.value,
    })
  }

  registerDetails(event) {
    event.preventDefault();
      getDataFor(this.state.cityChosen)
      .then(data => {
	this.setState({
	  citiesDetails: this.state.citiesDetails.concat({city: {
	    name: data.name,
	    temperature: `${Math.floor(data.main.temp)}°`,
	    weather: data.weather[0].description
	    }
	  })
	})
      })
  }

  render() {
    return (
      <div>
	<form onSubmit={this.registerDetails}>
	  <label>
	    <h1>Weather Man</h1>
	    <input className="researchCity" value={this.state.cityChosen} onChange={this.registerCity} autoFocus="autofocus" />
	  </label>
	  <input className="addCity" type="submit" value="Add" />
	</form>
        <CitiesAdded citiesDetails={this.state.citiesDetails} />
      </div>
    );
  }
}
