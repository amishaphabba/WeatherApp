let cityName = document.getElementById("cityName");
let image = document.getElementById("image");
let temperature = document.querySelector(".temperature")
let loc = document.querySelector(".loc")
let minTemp = document.querySelector(".minTemp")
let maxTemp = document.querySelector(".maxTemp")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let description = document.querySelector(".description")
let upperData = document.querySelector(".upperData")
let lowerData = document.querySelector(".lowerData")

// on Button Clicked
function searchBtn(){
    checkWeather(cityName.value)
}

async function checkWeather(cityName){

    const apiKey = 'a56f0835b595cd78279eb25cc0b766ca'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    const weatherData =await fetch(`${url}`).then(response=>response.json());
    // To Check Weather Data
    // console.log(weatherData)
    
    if(weatherData.cod=='404') // Wrong Input
    {
        upperData.innerHTML = 
        `<div class="notFound_404"> 
        <p>Sorry Location Not Found!!</p> 
        <img id="image" style="height: 160px;" src="images/404.png"  alt="">
        </div>`
        lowerData.style.display = "none"
    }
    else if(weatherData.cod=="400") // No Input
    { 
        upperData.innerHTML =
        `<div class="notFound_400">
        <p>Please Enter the City Name!!</p>
        </div>`
        lowerData.style.display = "none"
    }
    else  // Correct Input
    {
        loc.innerHTML = `${weatherData.name}`
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.5)}°c`
        description.innerHTML = `${weatherData.weather[0].description}`
        minTemp.innerHTML = `${Math.round(weatherData.main.temp_min - 273.5)}°c`
        maxTemp.innerHTML = `${Math.round(weatherData.main.temp_max - 273.5)}°c`
        humidity.innerHTML = `${weatherData.main.humidity}%`
        wind.innerHTML = `${Math.round(weatherData.wind.speed * 10) / 10} <br> km/hr`
        let image_src
        switch (weatherData.weather[0].main) {
            case 'Clouds':
                image_src = "/images/cloud.png"
                break

            case 'Clear':
                image_src = "/images/clear.png"
                break

            case 'Rain':
                image_src = "/images/rain.png"
                break

            case 'Snow':
                image_src = "/images/snow.png"
                break

            case 'Mist':
            case 'Haze':
            case 'Fog' :
                image_src = "/images/haze.png"
        }

        upperData.innerHTML=
        `<div class="found">
         <img id="image" style="height: 160px;" src="${image_src}"  alt="image not found">
         </div>`
        lowerData.style.display = "block"
    }
}