"use client";

import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar/searchBar";
import CurrentWeather from "../components/currentWeather/currentWeather";
import Forecast from "../components/forecast/forecast";
import Loader from "../components/loader/loader";
import ErrorMessage from "../components/errorMessage/errorMessage";
import UnitToggle from "../components/unitToggles/unitToggles";

import useDebounce from "../hooks/useDebounce";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";

export default function Home() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");

  const debouncedCity = useDebounce(city);

  const { data, forecast, loading, error, fetchWeather, fetchWeatherByLocation } = useWeather();
  const { coords, error: geoError, loading: geoLoading, getLocation } = useGeolocation();

  // Fetch weather by debounced city
  useEffect(() => {
    if (debouncedCity.length >= 2) {
      fetchWeather(debouncedCity, unit);
    }
  }, [debouncedCity, unit]);

  // Fetch weather when geolocation changes
  useEffect(() => {
    if (coords.lat && coords.lon) {
      fetchWeatherByLocation(coords.lat, coords.lon, unit);
    }
  }, [coords, unit]);

  const showEmptyState =
    !data && (!forecast || forecast.length === 0) && !loading && !geoLoading && !error && !geoError;

  return (
    <>
      <section className="hero">
        <p className="heroBadge">Live weather, anywhere</p>
        <h1 className="heroTitle">Check the forecast in seconds.</h1>
        <p className="heroSubtitle">
          Type a city or use your location to see current conditions and a 5-day outlook with one
          search.
        </p>
      </section>

      <SearchBar value={city} onChange={setCity} onSearch={() => fetchWeather(city, unit)} />
      <UnitToggle unit={unit} setUnit={setUnit} />

      {/* GEOLOCATION BUTTON */}
      <button className="geoButton" onClick={getLocation}>
        📍 Use My Location
      </button>

      {showEmptyState && (
        <section className="emptyState">
          <div className="emptyIcon">☁️</div>
          <h2 className="emptyTitle">Start with a city or your current location</h2>
          <p className="emptyText">
            Try searching for a place like <span>London</span> or tap the location button to see
            what the weather looks like around you.
          </p>
        </section>
      )}

      {/* Display loaders and errors */}
      {(loading || geoLoading) && <Loader />}
      {(error || geoError) && <ErrorMessage message={error || geoError} />}

      <CurrentWeather data={data} />
      <Forecast forecast={forecast} />
    </>
  );
}
