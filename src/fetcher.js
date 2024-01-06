export default async function getWeather(place) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=8dfe581ca0ab4c4ea61100418232212&q=${place}&days=3&aqi=no`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const weather = await response.json();
    console.log(weather);

    const location = weather.location;
    const current = weather.current;
    const forecast = weather.forecast;

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
