import getWeather from "./fetcher";

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

function handleError(error) {
  console.error(error);
  const message = "Location not found";
  locationValue.textContent = message;
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

async function displayClouds(clouds) {
  const { url } = await fetch(clouds.icon, { mode: "cors" });

  const img = document.createElement("img");
  img.src = url;
  cloudsValue.textContent = clouds.text;
  cloudIcon.innerHTML = "";
  cloudIcon.appendChild(img);
}

function displayWind(wind) {
  windValue.textContent = `${wind} kph`;
}

function displayVisibility(visibility) {
  visibilityValue.textContent = `${visibility} km`;
}

export default function displayWeather(place) {
  getWeather(place)
    .then((result) => {
      console.log(result);

      displayHumidity(result.humidity);
      displayPressure(result.pressure);
      displayLocation(result.city, result.country, result.localtime);
      displayTemperature(result.temperature);
      displayClouds(result.clouds);
      displayWind(result.wind);
      displayVisibility(result.visibility);
    })
    .catch((error) => {
      handleError(error);
    });
}

submit.addEventListener("click", () => displayWeather(input.value));
