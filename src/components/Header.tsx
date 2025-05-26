import React from 'react';
import { CloudSunRain, Sun, Moon, Thermometer, Wind } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const { preferences, toggleTemperatureUnit, toggleTheme } = useWeather();
  const { unit, theme } = preferences;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <CloudSunRain className="text-blue-500 mr-2" size={50} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              WeatherVue
            </h1>
          </div>

          <SearchBar />

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTemperatureUnit}
              className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-4"
              aria-label={`Switch to ${
                unit === "metric" ? "Fahrenheit" : "Celsius"
              }`}
            >
              <div className="flex items-center space-x-1">
                <Thermometer size={18} />
                <span>{unit === "metric" ? "°C" : "°F"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Wind size={18} />
                <span>{unit === "metric" ? "m/s" : "mph"}</span>
              </div>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;