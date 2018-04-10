import React from 'react';
import ReactDOM from 'react-dom';
import { getDataFor } from '../api'

class City extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      weather: "",
      name: "",
      temperature: "",
    }
    this.registerData= this.registerData.bind(this);
  }

  registerData() {
    getDataFor(this.props.userChoice)
      .then(data => {
	this.setState({
	  weather: data.weather[0].description,
	  name: data.name,
	  temperature: Math.floor(data.main.temp),
	})
      });
  }

  componentDidMount() {
    this.registerData();
  }

  render() {
    return (
      <p>{this.state.name} {this.state.temperature}°</p>
    );
  }
}

export { City }
