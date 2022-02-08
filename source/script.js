let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let min = now.getMinutes();
let minutes = ("0" + min).slice(-2);
let currentTime = `${day} ${hours}:${minutes}`;
let time = document.querySelector(".time");
time.innerHTML = `${currentTime}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElem = document.querySelector(".currentDegree");
  tempElem.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let cityElem = document.querySelector("h1");
  cityElem.innerHTML = `${city}`;
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = `${response.data.weather[0].main}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchInput(city);
}
function searchInput(city) {
  let apiKey = "8dc5c84de9b99758c12092b7cd18ffae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let searchLocation = document.querySelector(".top");
searchLocation.addEventListener("submit", search);

function searchCurrent() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}
let button = document.querySelector(".currentLoc");
button.addEventListener("click", searchCurrent);
function showCurrent(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey2 = "8dc5c84de9b99758c12092b7cd18ffae";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey2}`;
  axios.get(`${apiUrlCurrent}&appid=${apiKey2}`).then(showTemp);
}
searchInput("Amsterdam");
