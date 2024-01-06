import getWeather from "./fetcher";

const humidityValue = document.querySelector(".humidity-value");
const pressureValue = document.querySelector(".pressure-value");
const locationValue = document.querySelector(".location-value");
const temperatureValue = document.querySelector(".temperature-value");
const cloudsValue = document.querySelector(".clouds-value");
const windValue = document.querySelector(".wind-value");
const visibilityValue = document.querySelector(".visibility-value");
const input = document.querySelector("input");
const submit = document.querySelector(".fa-search");

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
  locationValue.textContent = `${city} ${country} ${localtime}`;
}

function displayTemperature(temperature) {
  temperatureValue.innerHTML = `${temperature} &deg;C`;
}

function displayClouds(clouds) {
  //   const imgElement = document.createElement("img");
  //   const iconPath = clouds.icon;
  //   const modifiedPath = iconPath.replace(
  //     "//cdn.weatherapi.com/weather/64x64",
  //     icons,
  //   );
  //   imgElement.src = modifiedPath;
  //   cloudsDiv.appendChild(imgElement);
  cloudsValue.textContent = `${clouds.text}`;
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
