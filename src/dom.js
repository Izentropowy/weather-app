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
const daily = document.querySelector(".daily");
const hourly = document.querySelector(".hourly");

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
  forecastResults.innerHTML = "";
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

  forecastResults.innerHTML = "";

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

async function displayDaily(forecast) {
  displayForecastedDays(forecast);

  forecast.forEach((row, index) => {
    const url = row.day.condition.icon;
    getForecastedWeatherIcon(url).then((newUrl) => {
      displayForecastedWeatherIcon(newUrl, index);
    });
  });
}

function displayHourly(forecast) {
  forecastResults.innerHTML = "";
  for (let i = 0; i < forecast.length; i += 4) {
    const epoch = forecast[i].time_epoch;
    const hour = new Date(epoch * 1000).getHours();
    const time = `${hour} : 00`;
    const temp = forecast[i].temp_c;
    const forecastDiv = createForecastDiv(time, temp, "", i);
    forecastResults.appendChild(forecastDiv);
    document.querySelectorAll(".night-temp").forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      element.textContent = "h";
    });
    const url = forecast[i].condition.icon;
    console.log(forecast[i]);
    getForecastedWeatherIcon(url).then((newUrl) => {
      displayForecastedWeatherIcon(newUrl, i);
    });
  }
}

let forecastFetched;
export default function displayWeather(place) {
  getWeather(place)
    .then((result) => {
      forecastFetched = result.forecast;
      getCurrentWeatherIcon(result);
      displayHumidity(result.humidity);
      displayPressure(result.pressure);
      displayLocation(result.city, result.country, result.localtime);
      displayTemperature(result.temperature);
      displayClouds(result.clouds);
      displayWind(result.wind);
      displayVisibility(result.visibility);
      getCurrentWeatherIcon(result).then((url) => {
        displayCurrentWeatherIcon(url);
      });
      displayDaily(result.forecast);
    })
    .catch((error) => {
      handleError(error);
    });
}

submit.addEventListener("click", () => displayWeather(input.value));
daily.addEventListener("click", () => displayDaily(forecastFetched));
hourly.addEventListener("click", () => displayHourly(forecastFetched[0].hour));
