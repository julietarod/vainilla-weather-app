function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    } 
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    } 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class=row>`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
                <div class="col-2">
                    <div class="weather-forecast-date">
                    ${day}    
                    </div>
                    
                    <br>
                    <img src="https://ssl.gstatic.com/onebox/weather/64/rain_light.png" alt="image" width="35"/>
                    <div class="weather-forecast-temperatures">
                       <span class="weather-forecast-maxTemp">
                        10°C   
                       </span>
                       <span class="weather-forecast-minTemp">
                         15°C  
                       </span>  
                    </div>
                </div>
            `;
    });
    
    
    forecastHTML = forecastHTML + `</div>`;
     
    forecastElement.innerHTML = forecastHTML;

}

function displayTemperature(response) {
    
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)


}
function search(city) {
let apiKey = "1c74ccab4b5e12f86079c6c084d79be2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);   
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    
}

search("milan");
displayForecast();





let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);