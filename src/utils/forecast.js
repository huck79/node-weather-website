const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2539f75c043c1bf6e0dbcac6e16bf31c&query=' + latitude + ',' + longitude +'&units=f'

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Weather Request- Unable to connect to weather service.', undefined)
        } else if (response.body.error) {
            callback('Weather Request- Bad latitude and/or longitude provided.', undefined)
        } else {
            callback(undefined, {
                weatherDiscription: response.body.current.weather_descriptions[0],
                currentTemp: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast