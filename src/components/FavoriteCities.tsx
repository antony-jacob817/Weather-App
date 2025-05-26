import React from "react";
import { MapPin, Trash2, Heart } from "lucide-react";
import { useWeather } from "../context/WeatherContext";

const FavoriteCities: React.FC = () => {
  const { preferences, setCurrentLocation, removeFavoriteCity } = useWeather();
  const { favorites } = preferences;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2x1 mt-6 min-h-[250px]">
      <div className="flex items-center mb-4 sm:mb-6">
        <Heart size={20} className="mr-2 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Favorite locations
        </h3>
      </div>

      <div className="flex flex-wrap gap-3 min-h-[50px]">
        {favorites.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500">
            No favorite locations added yet.
          </p>
        ) : (
          favorites.map((city) => (
            <div
              key={city.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div
                className="flex items-center cursor-pointer flex-1"
                onClick={() =>
                  setCurrentLocation({ lat: city.lat, lon: city.lon })
                }
              >
                <MapPin size={18} className="mr-2 text-blue-500" />
                <span className="font-medium text-gray-800 dark:text-white">
                  {city.name}, {city.country}
                </span>
              </div>
              <button
                onClick={() => removeFavoriteCity(city.id)}
                className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
                aria-label="Remove from favorites"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteCities;
