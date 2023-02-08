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

const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=${env.MAPBOX_ACCESS_KEY}&limit=1`  // Max limit is 10
// philadelphia is the place name across which coordinates are to be extracted
request({ url: geocodeURL, json: true }, (error, response) => {
    debugger;
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude, longitude)
    }
})