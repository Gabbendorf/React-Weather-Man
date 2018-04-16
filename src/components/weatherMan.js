import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from '../api';
import CitiesAdded from './citiesAdded';
import moment from 'moment';

export default class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityChosen: "",
      citiesDetails: [],
    }
    this.registerCitySearched = this.registerCitySearched.bind(this);
    this.registerCityDetails = this.registerCityDetails.bind(this);
  }

  registerCitySearched(event) {
    this.setState({
      cityChosen: event.target.value,
    })
  }

  fiveDays(data) {
    const fiveDays = [0, 7, 14, 21, 28];
    return fiveDays.map( (day) => {
      return {
	weekDay: moment(data.list[day].dt_txt).format('dddd'),
	description: data.list[day].weather[0].description,
	temperature: `${Math.floor(data.list[day].main.temp)}°C`,
      }
    });
  }

  notAddedYet(city) {
    return !this.state.citiesDetails.map( cityInfo => cityInfo.city.name).includes(city);
  }

  clearCityFieldForNewSearch() {
    this.setState({
      cityChosen: "",
    })
  }

  registerCityDetails(event) {
    event.preventDefault();
    getDataFor(this.state.cityChosen)
      .then(data => {
	if (this.notAddedYet(data.city.name)) {
	  this.setState({
	    citiesDetails: this.state.citiesDetails.concat({
	      city: {
		name: data.city.name,
		fiveDaysWeatherForecast: this.fiveDays(data)
	      }
	    })
	  });
	}
      });
   this.clearCityFieldForNewSearch();
  }

  render() {
    return (
      <div>
	<form onSubmit={this.registerCityDetails}>
	  <label>
	    <h1>Weather Man</h1>
	    <input className="searchCity" value={this.state.cityChosen} onChange={this.registerCitySearched} autoFocus="autofocus" />
	  </label>
	  <input className="addCity" type="submit" value="Add" />
	</form>
        <CitiesAdded citiesDetails={this.state.citiesDetails} />
      </div>
    );
  }
}
