const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express.config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Josh Arneson'
    })
})

// Define routes
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Josh Arneson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Josh Arneson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            errMsg: 'You must provide a location to get the weather!'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                errType: 'Geocoding Error',
                errMsg: error
        })}
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    errType: 'Weather API Error',
                    errMsg: error
                })
            }
            
            res.send({
                location: location,
                description: forecastData.weatherDiscription,
                temperature: forecastData.currentTemp,
                feelslike: forecastData.feelsLike
            })
        })
    })
})

app.get('/products', (req, res) => {
    // Make sure a search term is provided
    if (!req.query.search) {
         return res.send({ // Remember: return also exits the calling function (so the second res.send below will not fire, as if it was in an else block)
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Josh Arneson',
        errMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Josh Arneson',
        errMsg: 'Page not found.'
    })
})

// Start the express server
app.listen(port, () => {
    console.log("Web server is up on port " + port + ".")
})