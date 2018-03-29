import 'whatwg-fetch';
const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const APIKey = '&APPID=81ebd306a97bf6e5342257562b958514';

module.exports = {
  getDataFor(city) {
    const url = rootUrl + city + APIKey;
    return fetch(url)
      .then(response => {
	return response.json()
      });
  },

  flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
  }
};
