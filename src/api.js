import "whatwg-fetch"
import { APIKey } from "./APIKey"
const rootUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
const parameterForTemperatureInCelsius = "&units=metric"

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function getDataFor(city) {
  const url = rootUrl + city + parameterForTemperatureInCelsius + APIKey
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
}

export function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}
