import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Compass, 
  Sunrise, 
  Sunset,
  Heart,
  HeartOff
} from 'lucide-react';
import { WeatherData, GeocodingData } from '../types/weather';
import { 
  formatTemperature, 
  formatWindSpeed, 
  formatDate, 
  formatTime,
  getWeatherIconUrl,
  isDaytime
} from '../utils/helpers';
import { useWeather } from '../context/WeatherContext';
import { generateId } from '../utils/helpers';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  locationInfo?: GeocodingData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, locationInfo }) => {
  const { preferences, addFavoriteCity, removeFavoriteCity } = useWeather();
  const { unit, favorites } = preferences;
  
  const isCurrentLocationFavorite = favorites.some(
    fav => fav.lat === weatherData.coord.lat && fav.lon === weatherData.coord.lon
  );
  
  const daytime = isDaytime(
    weatherData.dt,
    weatherData.sys.sunrise,
    weatherData.sys.sunset
  );
  
  const handleToggleFavorite = () => {
    if (isCurrentLocationFavorite) {
      const favoriteToRemove = favorites.find(
        fav => fav.lat === weatherData.coord.lat && fav.lon === weatherData.coord.lon
      );
      if (favoriteToRemove) {
        removeFavoriteCity(favoriteToRemove.id);
      }
    } else {
      addFavoriteCity({
        id: generateId(),
        name: weatherData.name,
        country: weatherData.sys.country,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2x1 mt-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <button 
              onClick={handleToggleFavorite}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isCurrentLocationFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isCurrentLocationFavorite ? (
                <Heart size={20} className="text-red-500 fill-red-500" />
              ) : (
                <HeartOff size={20} className="text-gray-400 dark:text-gray-500" />
              )}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {formatDate(weatherData.dt)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-800 dark:text-white">
            {formatTemperature(weatherData.main.temp, unit)}
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            Feels like {formatTemperature(weatherData.main.feels_like, unit)}
          </div>
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <img 
          src={getWeatherIconUrl(weatherData.weather[0].icon, '4x')} 
          alt={weatherData.weather[0].description}
          className="w-24 h-24"
        />
        <div className="ml-4">
          <div className="text-xl font-semibold capitalize text-gray-800 dark:text-white">
            {weatherData.weather[0].description}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Thermometer size={16} className="mr-1" />
              <span>
                {formatTemperature(weatherData.main.temp_min, unit)} / {formatTemperature(weatherData.main.temp_max, unit)}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Droplets size={16} className="mr-1" />
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Wind size={16} className="mr-1" />
              <span>{formatWindSpeed(weatherData.wind.speed, unit)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Compass size={14} className="mr-1" />
            <span>Wind Direction</span>
          </div>
          <div className="text-gray-800 dark:text-white font-medium">
            {weatherData.wind.deg}° 
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Eye size={14} className="mr-1" />
            <span>Visibility</span>
          </div>
          <div className="text-gray-800 dark:text-white font-medium">
            {(weatherData.visibility / 1000).toFixed(1)} km
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Sunrise size={14} className="mr-1" />
            <span>Sunrise</span>
          </div>
          <div className="text-gray-800 dark:text-white font-medium">
            {formatTime(weatherData.sys.sunrise)}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Sunset size={14} className="mr-1" />
            <span>Sunset</span>
          </div>
          <div className="text-gray-800 dark:text-white font-medium">
            {formatTime(weatherData.sys.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;