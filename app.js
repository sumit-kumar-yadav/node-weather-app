const request = require('postman-request');
const env = require('./private_constants');

const weatherstackURL = `http://api.weatherstack.com/current?access_key=${env.WEATHERSTACK_ACCESS_KEY}&query=42.3605,-71.0596&units=f`

request({ url: weatherstackURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!')
    } else if (response.body.error) {
        console.log('Unable to find location')
    } else {
        console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
    }
})

