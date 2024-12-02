function updateTemperature(response) {
  let currentTemperatureValue = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#time");
  let currentDate = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  currentTemperatureValue.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(currentDate);
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

  // if (minutes < 10) {
  // minutes = `0${minutes}`;
  //}
  return `${day}, ${hour}:${minutes}`;
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
  axios.get(apiUrl).then(updateTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Harare");
