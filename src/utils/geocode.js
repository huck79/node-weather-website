const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlkYXN0b3VjaDEiLCJhIjoiY2wxYW9xNnk0MDVybDNtczY4bW05dnR3cCJ9.Xg-uorxzHzD0oT7TJQ_JMw&limit=1'

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('GeoLocating- Unable to connect to location services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('GeoLocating- Unable to convert location to coords (location unknown).', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode