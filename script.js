const apiKey = "cf3161f5b9e8d73c9f2bf79eb3730b4e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        console.log(data);

        

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds")
        {
            weatherIcon.src = "photos/clouds.png";
        }
        else if(data.weather[0].main == "Clear")
        {
            weatherIcon.src = "photos/clear.png";
        }
        else if(data.weather[0].main == "Rain")
        {
            weatherIcon.src = "photos/rain.png";
        }
        else if(data.weather[0].main == "Drizzle")
        {
            weatherIcon.src = "photos/drizzle.png";
        }
        else if(data.weather[0].main == "Mist")
        {
            weatherIcon.src = "photos/mist.png";
        }

       

    } catch (error) {
        alert("Error: " + error.message);
    }
    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
