const weatherFrom = document.querySelector('form')
const searchTerm = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = encodeURIComponent(searchTerm.value)

    // make sure a location has been provided
    if (location.length === 0) {
        message1.textContent = 'You must provide a location to get the weather!'
        message2.textContent = ''
        return ''
    } else {
        message1.textContent = 'Loading...'
        message2.textContent = ''
    }

    // attempt to convert location to coordinates (geocode) and return the weather (forecast)
    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.errType) {
                message1.textContent = 'Unable to find location. Please try again.'
                message2.textContent = ''
            } else {
                message1.textContent = data.location
                message2.textContent = data.description + ", " + data.temperature + " degrees, feels like " + data.feelslike + " degrees."
            }
        })
    })
})