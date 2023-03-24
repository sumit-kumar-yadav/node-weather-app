const request = require('postman-request');
const env = require('./enviroment');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${env.POSITIONSTACK_ACCESS_KEY}&query=${encodeURIComponent(address)}&limit=1`  // Max limit is 80


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.data.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode;