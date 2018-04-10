import React from 'react';
import ReactDOM from 'react-dom';
import { City } from './city';

class WeatherMan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityChosen: "",
      cities: "",
    }
    this.registerCity = this.registerCity.bind(this);
    this.addCity = this.addCity.bind(this);
  }

  registerCity(event) {
    this.setState({
      cityChosen: event.target.value,
    })
  }

  addCity(event) {
    event.preventDefault();
    this.setState({
      cities: this.state.cityChosen,
    })
  }

  render() {
    const cityDetails = this.state.cities != "" ? (
      <City userChoice={this.state.cities} />
    ) : (
      <p></p>
    );

    return (
      <div>
	<form onSubmit={this.addCity}>
	  <label>
	    <h1>Weather Man</h1>
	    <input className="researchCity" value={this.state.cityChosen} onChange={this.registerCity} autoFocus="autofocus" />
	  </label>
	  <input className="addCity" type="submit" value="Add" />
	</form>
        {cityDetails}
      </div>
    );
  }
}

export { WeatherMan }
