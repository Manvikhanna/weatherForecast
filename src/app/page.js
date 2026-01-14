'use client';

import { useEffect, useState } from 'react';
import CurrentWeather from '../components/currentWeather/currentWeather';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Forecast from '../components/forecast/forecast';
import Loader from '../components/loader/loader';
import SearchBar from '../components/searchBar/searchBar';
import UnitToggle from '../components/unitToggles/unitToggles';

import useDebounce from '../hooks/useDebounce';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeather } from '../hooks/useWeather';

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [autoError, setAutoError] = useState(null);

  const debouncedCity = useDebounce(city);

  const { data, forecast, loading, error, fetchWeather, fetchWeatherByLocation } = useWeather();
  const { coords, error: geoError, loading: geoLoading, getLocation } = useGeolocation();

  /* ───────── Fetch weather by city ───────── */
  useEffect(() => {
    if (debouncedCity.length >= 2) {
      fetchWeather(debouncedCity, unit);
    }
  }, [debouncedCity, unit]);

  /* ───────── Load unit from localStorage ───────── */
  useEffect(() => {
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit === 'metric' || savedUnit === 'imperial') {
      setUnit(savedUnit);
    }
  }, []);

  /* ───────── Fetch weather by location ───────── */
  useEffect(() => {
    if (coords.lat && coords.lon) {
      fetchWeatherByLocation(coords.lat, coords.lon, unit);
    }
  }, [coords, unit]);

  /* ───────── Auto-hide error after 3.5 sec ───────── */
  useEffect(() => {
    if (error || geoError) {
      setAutoError(error || geoError);

      const timer = setTimeout(() => {
        setAutoError(null);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [error, geoError]);

  const showEmptyState =
    !data && (!forecast || forecast.length === 0) && !loading && !geoLoading && !autoError;

  return (
    <>
      {/* ───────── Hero Section ───────── */}
      <section className='hero'>
        <div className='heroBadgeWrapper'>
          <span className='heroBadge'>
            <span className='badgePulse'></span>
            Live weather, anywhere
          </span>
        </div>

        <h1 className='heroTitle'>
          Check the forecast
          <span className='heroTitleAccent'> in seconds.</span>
        </h1>

        <p className='heroSubtitle'>
          Type a city or use your location to see current conditions and a 5-day outlook with one
          search.
        </p>
      </section>

      {/* ───────── Search Section ───────── */}
      <div className='searchSection'>
        <SearchBar value={city} onChange={setCity} onSearch={() => fetchWeather(city, unit)} />

        <div className='controlsRow'>
          <UnitToggle unit={unit} setUnit={setUnit} />

          <button
            className='geoButton'
            onClick={() => {
              setCity('');
              getLocation();
            }}
            disabled={geoLoading}>
            <svg
              className='geoIcon'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
              <circle cx='12' cy='10' r='3'></circle>
            </svg>
            {geoLoading ? 'Locating...' : 'Use My Location'}
          </button>
        </div>
      </div>

      {/* ───────── Empty State ───────── */}
      {showEmptyState && (
        <section className='emptyState'>
          <div className='emptyIconWrapper'>
            <div className='emptyIcon'>
              <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'></path>
              </svg>
            </div>
          </div>

          <h2 className='emptyTitle'>Start with a city or your current location</h2>
          <p className='emptyText'>
            Try searching for a place like <span className='emptyHighlight'>London</span>,{' '}
            <span className='emptyHighlight'>Tokyo</span>, or{' '}
            <span className='emptyHighlight'>New York</span>— or tap the location button to see what
            the weather looks like around you.
          </p>
        </section>
      )}

      {/* ───────── Loader & Error ───────── */}
      {(loading || geoLoading) && <Loader />}
      {autoError && <ErrorMessage message={autoError} />}

      {/* ───────── Weather Content ───────── */}
      <div className='weatherContent'>
        <CurrentWeather data={data} />
        <Forecast forecast={forecast} />
      </div>
    </>
  );
}
