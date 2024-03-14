
const weatherForm = document.querySelector(".weatherform")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "75b0058b14bc8648323a994f690fba07"

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const city = cityInput.value
    if (city) {
        try {
            const weatherdata = await getWeatherData(city)
            displayWeatherInfo(weatherdata)
        }
        catch (error) {
            console.error(error)
            displayError(error)
        }
    }
    else {
        displayError("Please enter a city")
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }
    return await response.json()
}

function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data
        
    card.textContent = ``
    card.style.display = "block"

    const cityDisplay = document.createElement("h1")
    cityDisplay.classList.add("cityDisplay")
    cityDisplay.textContent = city
    card.appendChild(cityDisplay)

    const tempDisplay = document.createElement("p")
    tempDisplay.classList.add("tempDisplay")
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`
    card.appendChild(tempDisplay)
    
    const humidityDisplay = document.createElement("p")
    humidityDisplay.classList.add("humidityDisplay")
    humidityDisplay.textContent=`Humidity:${humidity}%`
    card.appendChild(humidityDisplay)

    const descDisplay = document.createElement("p")
    descDisplay.classList.add("descDisplay")
    descDisplay.textContent=description
    card.appendChild(descDisplay)

    const weatherEmoji = document.createElement("p")
    weatherEmoji.textContent=getWeatherEmoji(id)
    weatherEmoji.classList.add("weatherEmoji")
    card.appendChild(weatherEmoji)


}
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}
function displayError(message) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)
}