const request = require('postman-request');
const env = require('../private_constants');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${env.WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}&units=m`  // in degree celcius


    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast;


/*
// Note: For running this application type in command --> 

sumit.yadav@Sumits-MacBook-Pro weather-app % node app.js Akurdi Pune

                OUTPUT
Akurdi, Pimpri-Chinchwad, MH, India
Clear. It is currently 25 degress out.

*/