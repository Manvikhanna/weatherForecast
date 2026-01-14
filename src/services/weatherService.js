const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city, unit) => {
  const res = await fetch(`${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();

  if (!res.ok) {
    if (data.cod === 401) {
      throw new Error("Invalid or inactive API key");
    }
    if (data.cod === 404) {
      throw new Error("City not found");
    }
    if (data.cod === 429) {
      throw new Error("API limit exceeded");
    }
    throw new Error("Something went wrong");
  }

  return data;
};

export const getForecast = async (city, unit) => {
  const res = await fetch(`${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Forecast error");
  }

  return data;
};

export const getCurrentWeatherByCoords = async (lat, lon, unit) => {
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();

  if (!res.ok) {
    if (data.cod === 401) throw new Error("Invalid or inactive API key");
    if (data.cod === 429) throw new Error("API limit exceeded");
    throw new Error("Location weather error");
  }

  return data;
};

export const getForecastByCoords = async (lat, lon, unit) => {
  const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);

  const data = await res.json();

  if (!res.ok) throw new Error("Location forecast error");

  return data;
};
