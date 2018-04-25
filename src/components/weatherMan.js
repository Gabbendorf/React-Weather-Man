import React from "react"
import ReactDOM from "react-dom"
import { getDataFor } from "../api"
import CitiesAdded from "./CitiesAdded"
import moment from "moment"

export default class WeatherMan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      citySearched: "",
      citiesDetails: [],
      errorMessage: ""
    }
    this.registerCitySearched = this.registerCitySearched.bind(this)
    this.registerCityDetails = this.registerCityDetails.bind(this)
    this.checkUserInput = this.checkUserInput.bind(this)
  }

  registerCitySearched(event) {
    this.setState({
      citySearched: event.target.value
    })
  }

  fiveDays(data) {
    const fiveDays = [0, 7, 14, 21, 28]
    return fiveDays.map(day => {
      return {
        weekDay: moment(data.list[day].dt_txt).format("dddd"),
        description: data.list[day].weather[0].description,
        temperature: `${Math.floor(data.list[day].main.temp)}°C`
      }
    })
  }

  notAddedYet(city) {
    return !this.state.citiesDetails
      .map(cityInfo => cityInfo.city.name)
      .includes(city)
  }

  registerCityDetails(event, data) {
    this.setState({
      errorMessage: "",
      citiesDetails: this.state.citiesDetails.concat({
        city: {
          name: data.city.name,
          fiveDaysWeatherForecast: this.fiveDays(data)
        }
      })
    })
  }

  clearCityFieldForNewSearch() {
    this.setState({
      citySearched: ""
    })
  }

  checkUserInput(event) {
    event.preventDefault()
    getDataFor(this.state.citySearched)
      .then(data => {
        if (this.notAddedYet(data.city.name)) {
          this.registerCityDetails(event, data)
        } else {
          this.setState({
            errorMessage: "city already added"
          })
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: "city not found"
        })
      })
    this.clearCityFieldForNewSearch()
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.checkUserInput}>
          <label>
            <h1>Weather Man</h1>
            <input
              className="search-city"
              value={this.state.citySearched}
              onChange={this.registerCitySearched}
              autoFocus="autofocus"
            />
          </label>
          <input className="add-city-button" type="submit" value="Add City" />
          {this.state.errorMessage != "" && (
            <div className="error-message">{this.state.errorMessage}</div>
          )}
        </form>
        <CitiesAdded citiesDetails={this.state.citiesDetails} />
      </div>
    )
  }
}
