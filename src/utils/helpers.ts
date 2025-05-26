import { format, fromUnixTime } from 'date-fns';

// Format temperature based on unit
export const formatTemperature = (temp: number, unit: 'metric' | 'imperial'): string => {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${unit === 'metric' ? 'C' : 'F'}`;
};

// Format wind speed based on unit
export const formatWindSpeed = (speed: number, unit: 'metric' | 'imperial'): string => {
  return `${speed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
};

// Format date from unix timestamp
export const formatDate = (unixTimestamp: number, formatString: string = 'EEEE, MMMM d'): string => {
  return format(fromUnixTime(unixTimestamp), formatString);
};

// Format time from unix timestamp
export const formatTime = (unixTimestamp: number, formatString: string = 'h:mm a'): string => {
  return format(fromUnixTime(unixTimestamp), formatString);
};

// Group forecast data by day
export const groupForecastByDay = (forecastList: any[]): any[] => {
  const grouped: { [key: string]: any[] } = {};
  
  forecastList.forEach(item => {
    const date = format(new Date(item.dt_txt), 'yyyy-MM-dd');
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    
    grouped[date].push(item);
  });
  
  return Object.values(grouped);
};

// Get weather icon URL
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

// Get air quality index label
export const getAirQualityLabel = (aqi: number): string => {
  const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return labels[aqi - 1] || 'Unknown';
};

// Get air quality color
export const getAirQualityColor = (aqi: number): string => {
  const colors = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];
  return colors[aqi - 1] || '#9E9E9E';
};

// Get UV index label
export const getUVIndexLabel = (uvIndex: number): string => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

// Get UV index color
export const getUVIndexColor = (uvIndex: number): string => {
  if (uvIndex <= 2) return '#4CAF50';
  if (uvIndex <= 5) return '#FFC107';
  if (uvIndex <= 7) return '#FF9800';
  if (uvIndex <= 10) return '#F44336';
  return '#9C27B0';
};

// Get weather background class based on weather condition
export const getWeatherBackgroundClass = (weatherId: number, isDaytime: boolean): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'bg-gradient-to-br from-gray-900 to-gray-700';
  }
  
  // Drizzle or Rain
  if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return isDaytime 
      ? 'bg-gradient-to-br from-blue-300 to-gray-400' 
      : 'bg-gradient-to-br from-gray-800 to-blue-900';
  }
  
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return isDaytime 
      ? 'bg-gradient-to-br from-blue-100 to-gray-200' 
      : 'bg-gradient-to-br from-gray-700 to-blue-800';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return isDaytime 
      ? 'bg-gradient-to-br from-gray-300 to-gray-400' 
      : 'bg-gradient-to-br from-gray-800 to-gray-900';
  }
  
  // Clear
  if (weatherId === 800) {
    return isDaytime 
      ? 'bg-gradient-to-br from-blue-400 to-blue-300' 
      : 'bg-gradient-to-br from-blue-900 to-indigo-900';
  }
  
  // Clouds
  if (weatherId > 800) {
    return isDaytime 
      ? 'bg-gradient-to-br from-blue-200 to-gray-300' 
      : 'bg-gradient-to-br from-gray-700 to-blue-800';
  }
  
  // Default
  return isDaytime 
    ? 'bg-gradient-to-br from-blue-300 to-blue-200' 
    : 'bg-gradient-to-br from-blue-800 to-gray-900';
};

// Determine if it's daytime based on current time and sunrise/sunset
export const isDaytime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime <= sunset;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};