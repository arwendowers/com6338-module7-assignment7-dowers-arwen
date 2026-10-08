var weatherURL = "https://api.openweathermap.org/data/2.5/weather"

var weatherDiv = document.getElementById('weather')
var form = document.querySelector('form')

form.onsubmit = function(e) {
    e.preventDefault()

    var userQuery = this.search.value.trim()
    if (!userQuery) return

    form.search.value = ""

    var queryString = "?units=imperial&appid=a5fa440f9c188c5111d0757b944e6747&q=" + userQuery
    var fetchURL = weatherURL + queryString

    fetch(fetchURL)
    .then(function(res) {
        if (res.status !== 200) {
            throw new Error('Location not found')
        }
        return res.json()
    })
    .then(renderWeather)
    .catch(function(err) {
        weatherDiv.innerHTML = ""

        var errorMessage = document.createElement('h2')
        errorMessage.textContent = err.message
        weatherDiv.appendChild(errorMessage)
    })
}

function renderWeather(weatherData) {
    weatherDiv.innerHTML = ""

    var locationName = document.createElement('h2')
    locationName.textContent = weatherData.name + ', ' + weatherData.sys.country
    weatherDiv.appendChild(locationName)

    var googleMaps = document.createElement('a')
    googleMaps.href = "https://www.google.com/maps/search/?api=1&query=" + weatherData.coord.lat + "," + weatherData.coord.lon
    googleMaps.target = "__BLANK"
    googleMaps.textContent = "Click to view map"
    weatherDiv.appendChild(googleMaps)

    var weatherIcon = document.createElement('img')
    var iconCode = weatherData.weather[0].icon
    weatherIcon.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
    weatherDiv.appendChild(weatherIcon)

    var weatherCondition = document.createElement('p')
    weatherCondition.style = "text-transform: capitalize;"
    weatherCondition.textContent = weatherData.weather[0].description
    weatherDiv.appendChild(weatherCondition)
    var lineBreak = document.createElement('br')
    weatherDiv.appendChild(lineBreak)

    var actualTemp = document.createElement('p')
    actualTemp.textContent = "Current: " + weatherData.main.temp + "\u00B0 F"
    weatherDiv.appendChild(actualTemp)

    var perceivedTemp = document.createElement('p')
    perceivedTemp.textContent = "Feels like: " + weatherData.main.feels_like + "\u00B0 F"
    weatherDiv.appendChild(perceivedTemp)
    var lineBreak = document.createElement('br')
    weatherDiv.appendChild(lineBreak)

    var updatedTime = document.createElement('p')
    var date = new Date((weatherData.dt) * 1000)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    updatedTime.textContent = "Last updated: " + timeString
    weatherDiv.appendChild(updatedTime)
}