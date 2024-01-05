import "./assets/styles.css";

const locationDiv = document.querySelector(".location");
const temperatureDiv = document.querySelector(".temperature");
const windDiv = document.querySelector(".wind");
const input = document.querySelector("input");
const submit = document.querySelector(".fa-search");

async function getWeather(place) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=8dfe581ca0ab4c4ea61100418232212&q=${place}&days=3&aqi=no`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const weather = await response.json();
    const location = weather.location.name;
    const temperature = weather.current.temp_c;
    const wind = weather.current.wind_kph;
    console.log(weather);
    return [location, temperature, wind];
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

function handleError() {
  const message = "Location not found";
  locationDiv.textContent = message;
}

function displayWeather(place) {
  getWeather(place)
    .then((result) => {
      const location = result[0];
      const temperature = result[1];
      const wind = result[2];

      locationDiv.textContent = location;
      temperatureDiv.textContent = temperature;
      windDiv.textContent = wind;
    })
    .catch(() => {
      handleError();
    });
}

submit.addEventListener("click", () => {
  const inputValue = input.value;
  displayWeather(inputValue);
});
