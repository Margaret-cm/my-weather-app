function updateWeather(response) {
  let error = response.data.message;
  if (error === "City not found") {
    alert("City not found");
    let cityElement = "Harare";
    searchCity("Harare");
  } else {
    let currentTemperatureValue = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let timeElement = document.querySelector("#time");
    let currentDate = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");

    cityElement.innerHTML = response.data.city;
    currentTemperatureValue.innerHTML = Math.round(temperature);
    timeElement.innerHTML = formatDate(currentDate);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class=.current-details-icon"/>`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;

    getForecast(response.data.city);
  }
}

function formatDate(currentDate) {
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  return `${day} ${hour}:${minutes}, `;
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "024aa03t44f40e2f16f8abod4036b3b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function getForecast(city) {
  let apiKey = "024aa03t44f40e2f16f8abod4036b3b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6)
      forecastHtml =
        forecastHtml +
        `<div class="forecast-daily">
            <div class="forecast-day">${formatDay(forecastDay.time)}
            </div>
            <img src = "${
              forecastDay.condition.icon_url
            }" class = "forecast-icon">
            <div class="forecast-temperatures">
              <div class="forecast-max-temperature">${Math.round(
                forecastDay.temperature.maximum
              )}° / </div>
              <div class ="forecast-min-temperature">${Math.round(
                forecastDay.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Harare");
