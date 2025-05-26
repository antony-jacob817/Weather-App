import React, { useState, useRef } from 'react';
import { Search, MapPin, X, Map } from 'lucide-react';
import { searchCity } from '../services/api';
import { GeocodingData } from '../types/weather';
import { useWeather } from '../context/WeatherContext';
import useGeolocation from '../hooks/useGeolocation';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { setCurrentLocation } = useWeather();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const geolocation = useGeolocation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const data = await searchCity(query);
      setResults(data);
    } catch (error) {
      console.error('Error searching for city:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = (city: GeocodingData) => {
    setCurrentLocation({ lat: city.lat, lon: city.lon });
    setQuery(`${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`);
    setShowResults(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleGetCurrentLocation = () => {
    if (geolocation.position) {
      setCurrentLocation({
        lat: geolocation.position.lat,
        lon: geolocation.position.lon
      });
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full py-2 pl-10 pr-24 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white shadow-sm"
          />
          <Map className="absolute left-3 text-gray-700 dark:text-gray-300" size={18} />
          
          <div className="absolute right-3 flex items-center space-x-1">
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={18} />
              </button>
            )}
            
            <button
              type="submit"
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              <Search size={18} className="text-gray-700 dark:text-gray-300" />
            </button>

            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="p-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              title="Use current location"
              disabled={!geolocation.position}
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <MapPin size={18} className="text-gray-700 dark:text-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
          <ul>
            {results.map((city, index) => (
              <li
                key={`${city.lat}-${city.lon}-${index}`}
                onClick={() => handleSelectCity(city)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center dark:text-white"
              >
                <MapPin size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span>
                  {city.name}
                  {city.state && `, ${city.state}`}, {city.country}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && results.length === 0 && !isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center dark:text-white">
          No cities found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default SearchBar;