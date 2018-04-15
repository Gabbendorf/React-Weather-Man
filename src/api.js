import 'whatwg-fetch';
const rootUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const parameterForTemperatureInCelsius = "&units=metric";
const APIKey = '&APPID=81ebd306a97bf6e5342257562b958514';

module.exports = {
  getDataFor(city) {
    const url = rootUrl + city + parameterForTemperatureInCelsius + APIKey ;
    return fetch(url)
      .then(response => {
	return response.json()
      });
  },

  flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
  }
};
