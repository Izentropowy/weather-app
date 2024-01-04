import "./assets/styles.css";

const url =
  "http://api.weatherapi.com/v1/current.json?key=8dfe581ca0ab4c4ea61100418232212&q=London&aqi=no";

async function getWeather() {
  let response = await fetch(url, { mode: "cors" });
  let weather = await response.json();
  console.log(weather);
  return weather;
}

getWeather();
