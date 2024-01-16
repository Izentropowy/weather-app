export async function getWeather(place) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=8dfe581ca0ab4c4ea61100418232212&q=${place}&days=3&aqi=no`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const { location, current, forecast } = await response.json();

    const valuesRequired = {
      humidity: current.humidity,
      pressure: current.pressure_mb,
      city: location.name,
      country: location.country,
      localtime: location.localtime,
      temperature: current.temp_c,
      clouds: current.condition,
      wind: current.wind_kph,
      visibility: current.vis_km,
      forecast: forecast.forecastday,
    };

    return valuesRequired;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function getCurrentWeatherIcon(weather) {
  const url = weather.clouds.icon;
  try {
    const response = await fetch(url, { mode: "cors" });
    return response.url;
  } catch (error) {
    console.error("Error fetching current weather icon:", error);
    throw error;
  }
}

export async function getForecastedWeatherIcon(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    return response.url;
  } catch (error) {
    console.error("Error fetching forecast weather icon:", error);
    throw error;
  }
}
