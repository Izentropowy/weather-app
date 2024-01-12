import {
  getWeather,
  getCurrentWeatherIcon,
  getForecastedWeatherIcon,
} from "./fetcher";

const humidityValue = document.querySelector(".humidity-value");
const pressureValue = document.querySelector(".pressure-value");
const locationValue = document.querySelector(".location-value-1");
const locationValueDate = document.querySelector(".location-value-2");
const temperatureValue = document.querySelector(".temperature-value");
const cloudsValue = document.querySelector(".clouds-value");
const windValue = document.querySelector(".wind-value");
const visibilityValue = document.querySelector(".visibility-value");
const input = document.querySelector("input");
const submit = document.querySelector(".fa-search");
const cloudIcon = document.querySelector(".weather-icon");
const forecastResults = document.querySelector(".forecast-results");

function handleError(error) {
  console.error(error);
  const message = "Location not found";
  locationValue.textContent = message;
  humidityValue.textContent = "-";
  pressureValue.textContent = "-";
  temperatureValue.textContent = "-";
  cloudsValue.textContent = "-";
  windValue.textContent = "-";
  visibilityValue.textContent = "-";
}

function displayHumidity(humidity) {
  humidityValue.textContent = `${humidity} %`;
}

function displayPressure(pressure) {
  pressureValue.textContent = `${pressure} hPa`;
}

function displayLocation(city, country, localtime) {
  locationValue.textContent = `${city} ${country}`;
  locationValueDate.textContent = `${localtime}`;
}

function displayTemperature(temperature) {
  temperatureValue.innerHTML = `${temperature} &deg;C`;
}

function displayClouds(clouds) {
  cloudsValue.textContent = clouds.text;
}

async function createForecastedClouds(clouds) {
  const { url } = await fetch(clouds.icon, { mode: "cors" });
  const img = document.createElement("img");
  img.src = url;
  return img;
}

function displayWind(wind) {
  windValue.textContent = `${wind} kph`;
}

function displayVisibility(visibility) {
  visibilityValue.textContent = `${visibility} km`;
}

function createForecastDiv(day, tempDay, tempNight, row) {
  const forecastDiv = document.createElement("div");
  forecastDiv.classList.add("forecast-result-window");
  forecastDiv.innerHTML = `
    <h3 class="day">${day}</h3>
    <br>
    <h4 class="day-temp">${tempDay} &deg;C</h4>
    <h6 class="night-temp">${tempNight} &deg;C</h6>
    <br>
    <div class="forecast-icon day-icon-${row}"></div>`;
  return forecastDiv;
}

function displayCurrentWeatherIcon(url) {
  const img = document.createElement("img");
  img.src = url;
  cloudIcon.innerHTML = "";
  cloudIcon.appendChild(img);
}

function displayForecastedDays(forecast) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  forecast.forEach((row, index) => {
    const day = days[new Date(row.date_epoch * 1000).getDay()];
    const tempDay = row.day.maxtemp_c;
    const tempNight = row.day.mintemp_c;
    const forecastDiv = createForecastDiv(day, tempDay, tempNight, index);
    forecastResults.appendChild(forecastDiv);
  });
}

function displayForecastedWeatherIcon(url, index) {
  const img = document.createElement("img");
  img.src = url;
  document.querySelector(`.day-icon-${index}`).innerHTML = "";
  document.querySelector(`.day-icon-${index}`).appendChild(img);
}

export default function displayWeather(place) {
  getWeather(place)
    .then((result) => {
      console.log(result);
      getCurrentWeatherIcon(result);
      displayHumidity(result.humidity);
      displayPressure(result.pressure);
      displayLocation(result.city, result.country, result.localtime);
      displayTemperature(result.temperature);
      displayClouds(result.clouds);
      displayWind(result.wind);
      displayVisibility(result.visibility);
      displayForecastedDays(result.forecast);
      getCurrentWeatherIcon(result).then((url) => {
        displayCurrentWeatherIcon(url);
      });
      result.forecast.forEach((row, index) => {
        getForecastedWeatherIcon(row).then((url) => {
          displayForecastedWeatherIcon(url, index);
        });
      });
    })
    .catch((error) => {
      handleError(error);
    });
}

submit.addEventListener("click", () => displayWeather(input.value));
