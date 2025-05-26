import axios from 'axios';
import { WeatherData, ForecastData, AirQualityData, GeocodingData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

// Create axios instance with common configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

// Get current weather by coordinates
export const getCurrentWeather = async (lat: number, lon: number, units: string = 'metric'): Promise<WeatherData> => {
  try {
    const response = await api.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast by coordinates
export const getForecast = async (lat: number, lon: number, units: string = 'metric'): Promise<ForecastData> => {
  try {
    const response = await api.get('/data/2.5/forecast', {
      params: {
        lat,
        lon,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get air quality data by coordinates
export const getAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  try {
    const response = await api.get('/data/2.5/air_pollution', {
      params: {
        lat,
        lon,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

// Geocoding API to search for cities
export const searchCity = async (query: string): Promise<GeocodingData[]> => {
  try {
    const response = await api.get('/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching city:', error);
    throw error;
  }
};

// Reverse geocoding to get city name from coordinates
export const getCityByCoordinates = async (lat: number, lon: number): Promise<GeocodingData[]> => {
  try {
    const response = await api.get('/geo/1.0/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting city by coordinates:', error);
    throw error;
  }
};