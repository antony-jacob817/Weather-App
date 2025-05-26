import { useState, useEffect } from 'react';
import { 
  getCurrentWeather, 
  getForecast, 
  getAirQuality, 
  getCityByCoordinates 
} from '../services/api';
import { WeatherData, ForecastData, AirQualityData, GeocodingData } from '../types/weather';

interface WeatherState {
  loading: boolean;
  error: string | null;
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  locationInfo: GeocodingData | null;
}

const useWeatherData = (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') => {
  const [state, setState] = useState<WeatherState>({
    loading: true,
    error: null,
    currentWeather: null,
    forecast: null,
    airQuality: null,
    locationInfo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        // Fetch all data in parallel
        const [weatherData, forecastData, airQualityData, locationData] = await Promise.all([
          getCurrentWeather(lat, lon, units),
          getForecast(lat, lon, units),
          getAirQuality(lat, lon),
          getCityByCoordinates(lat, lon),
        ]);

        setState({
          loading: false,
          error: null,
          currentWeather: weatherData,
          forecast: forecastData,
          airQuality: airQualityData,
          locationInfo: locationData[0] || null,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather data. Please try again.',
        }));
      }
    };

    if (lat && lon) {
      fetchData();
    }
  }, [lat, lon, units]);

  return state;
};

export default useWeatherData;