import { UserPreferences, FavoriteCity } from '../types/weather';

const STORAGE_KEY = 'weather-app-preferences';

// Default user preferences
const defaultPreferences: UserPreferences = {
  unit: 'metric',
  theme: 'light',
  favorites: [],
};

// Get user preferences from localStorage
export const getUserPreferences = (): UserPreferences => {
  try {
    const storedPreferences = localStorage.getItem(STORAGE_KEY);
    if (storedPreferences) {
      return JSON.parse(storedPreferences);
    }
    return defaultPreferences;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return defaultPreferences;
  }
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

// Add a city to favorites
export const addFavoriteCity = (city: FavoriteCity): UserPreferences => {
  const preferences = getUserPreferences();
  
  // Check if city already exists in favorites
  const cityExists = preferences.favorites.some(fav => fav.id === city.id);
  
  if (!cityExists) {
    // Limit to 5 favorites
    if (preferences.favorites.length >= 10) {
      preferences.favorites.pop(); // Remove the last item
    }
    
    preferences.favorites.unshift(city); // Add to the beginning
    saveUserPreferences(preferences);
  }
  
  return preferences;
};

// Remove a city from favorites
export const removeFavoriteCity = (cityId: string): UserPreferences => {
  const preferences = getUserPreferences();
  preferences.favorites = preferences.favorites.filter(city => city.id !== cityId);
  saveUserPreferences(preferences);
  return preferences;
};

// Toggle temperature unit
export const toggleTemperatureUnit = (): UserPreferences => {
  const preferences = getUserPreferences();
  preferences.unit = preferences.unit === 'metric' ? 'imperial' : 'metric';
  saveUserPreferences(preferences);
  return preferences;
};

// Toggle theme
export const toggleTheme = (): UserPreferences => {
  const preferences = getUserPreferences();
  preferences.theme = preferences.theme === 'light' ? 'dark' : 'light';
  saveUserPreferences(preferences);
  return preferences;
};