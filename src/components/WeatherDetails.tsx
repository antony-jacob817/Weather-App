import React from 'react';
import { WeatherData, ForecastData, AirQualityData, GeocodingData } from '../types/weather';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import AirQualityCard from './AirQualityCard';
import WeatherMap from './WeatherMap';
import FavoriteCities from './FavoriteCities';
import { useWeather } from '../context/WeatherContext';

interface WeatherDetailsProps {
  currentWeather: WeatherData;
  forecast: ForecastData;
  airQuality: AirQualityData;
  locationInfo: GeocodingData | null;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  currentWeather,
  forecast,
  airQuality,
  locationInfo
}) => {
  const { preferences } = useWeather();
  const { unit } = preferences;

  return (
    <div className="container mx-auto px-4 pb-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 flex flex-col h-full">
          <div className="flex-1">
            <CurrentWeather
              weatherData={currentWeather}
              locationInfo={locationInfo}
            />
            <FavoriteCities />
          </div>
          <div className="mt-6 -mb-6 sm:-mb-0">
            <AirQualityCard airQualityData={airQuality} />
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col space-y-6">
          <HourlyForecast forecastData={forecast} unit={unit} />
          <DailyForecast forecastData={forecast} unit={unit} />
          <WeatherMap
            center={[currentWeather.coord.lat, currentWeather.coord.lon]}
            zoom={10}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;