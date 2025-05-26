import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import WeatherDetails from '../components/WeatherDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useGeolocation from '../hooks/useGeolocation';
import useWeatherData from '../hooks/useWeatherData';
import { useWeather } from '../context/WeatherContext';

const WeatherPage: React.FC = () => {
  const geolocation = useGeolocation();
  const { currentLocation, setCurrentLocation, preferences } = useWeather();
  const { unit } = preferences;
  
  // Use geolocation if available and no current location is set
  useEffect(() => {
    if (!geolocation.loading && !geolocation.error && geolocation.position && !currentLocation) {
      setCurrentLocation({
        lat: geolocation.position.lat,
        lon: geolocation.position.lon
      });
    }
  }, [geolocation, currentLocation, setCurrentLocation]);
  
  // Fetch weather data based on current location
  const weatherData = useWeatherData(
    currentLocation?.lat || 0,
    currentLocation?.lon || 0,
    unit
  );
  
  const { loading, error, currentWeather, forecast, airQuality, locationInfo } = weatherData;
  
  // Handle retry on error
  const handleRetry = () => {
    window.location.reload();
  };
  
  // Determine page title
  const pageTitle = currentWeather 
    ? `${currentWeather.name} Weather - ${Math.round(currentWeather.main.temp)}°${unit === 'metric' ? 'C' : 'F'}`
    : 'WeatherVue - Real-time Weather Forecasts';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        {currentWeather && (
          <meta
            name="description"
            content={`Current weather in ${currentWeather.name}: ${
              currentWeather.weather[0].description
            }, ${Math.round(currentWeather.main.temp)}°${
              unit === "metric" ? "C" : "F"
            }`}
          />
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Header />

        <main>
          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && currentWeather && forecast && airQuality && (
            <WeatherDetails
              currentWeather={currentWeather}
              forecast={forecast}
              airQuality={airQuality}
              locationInfo={locationInfo}
            />
          )}
        </main>
        <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>WeatherVue &copy; {new Date().getFullYear()} - Built with React</p>
        </footer>
      </div>
    </>
  );
};

export default WeatherPage;