const request = require('postman-request');
const env = require('./private_constants');
// encodeURIComponent( address )

const weatherstackURL = `http://api.weatherstack.com/current?access_key=${env.WEATHERSTACK_ACCESS_KEY}&query=42.3605,-71.0596&units=m`  // in degree celcius

request({ url: weatherstackURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!')
    } else if (response.body.error) {
        console.log('Unable to find location')
    } else {
        console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
    }
})

const geocodeURL = `http://api.positionstack.com/v1/forward?access_key=${env.POSITIONSTACK_ACCESS_KEY}&query=Sahibganj&limit=1`  // Max limit is 80

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } 
    else if (response.body.data.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.data[0].latitude;
        const longitude = response.body.data[0].longitude;
        console.log(latitude, longitude)
    }
})