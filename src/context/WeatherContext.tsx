import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences, FavoriteCity } from '../types/weather';
import { 
  getUserPreferences, 
  saveUserPreferences, 
  addFavoriteCity as addFavorite,
  removeFavoriteCity as removeFavorite,
  toggleTemperatureUnit as toggleUnit,
  toggleTheme as toggleThemeMode
} from '../utils/localStorage';

interface WeatherContextType {
  preferences: UserPreferences;
  currentLocation: { lat: number; lon: number } | null;
  setCurrentLocation: (location: { lat: number; lon: number } | null) => void;
  addFavoriteCity: (city: FavoriteCity) => void;
  removeFavoriteCity: (cityId: string) => void;
  toggleTemperatureUnit: () => void;
  toggleTheme: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(getUserPreferences());
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);

  // Default to New Delhi if no location is set
  useEffect(() => {
    if (!currentLocation) {
      setCurrentLocation({ lat: 28.6139, lon: 77.2090 });
    }
  }, [currentLocation]);

  // Apply theme when preferences change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
  }, [preferences.theme]);

  const addFavoriteCity = (city: FavoriteCity) => {
    const updatedPreferences = addFavorite(city);
    setPreferences(updatedPreferences);
  };

  const removeFavoriteCity = (cityId: string) => {
    const updatedPreferences = removeFavorite(cityId);
    setPreferences(updatedPreferences);
  };

  const toggleTemperatureUnit = () => {
    const updatedPreferences = toggleUnit();
    setPreferences(updatedPreferences);
  };

  const toggleTheme = () => {
    const updatedPreferences = toggleThemeMode();
    setPreferences(updatedPreferences);
  };

  return (
    <WeatherContext.Provider
      value={{
        preferences,
        currentLocation,
        setCurrentLocation,
        addFavoriteCity,
        removeFavoriteCity,
        toggleTemperatureUnit,
        toggleTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};