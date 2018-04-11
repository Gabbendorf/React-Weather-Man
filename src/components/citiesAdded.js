import React from 'react';
import ReactDOM from 'react-dom';

export default class CitiesAdded extends React.Component {

  constructor(props) {
    super(props)
  }

  noCitiesAddedYet() {
    return this.props.citiesDetails.length === 0;
  }

  render() {
    const citiesList = this.noCitiesAddedYet() ? (
      <p></p>
    ) : (
      this.props.citiesDetails.map( cityDetails =>
	<li key={cityDetails.city.name}>
          {cityDetails.city.name} {cityDetails.city.temperature}
        </li>
      ));
    return (
      <ul>
        {citiesList}
      </ul>
    )
  }
}
