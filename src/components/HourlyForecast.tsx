import React from 'react';
import { Hourglass } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { ForecastData } from '../types/weather';
import ForecastCard from './ForecastCard';

interface HourlyForecastProps {
  forecastData: ForecastData;
  unit: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecastData, unit }) => {
  // Get the next 12 hours of forecast
  const hourlyForecast = forecastData.list.slice(0, 8);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2x1 mt-6">
      <div className="flex items-center mb-4 sm:mb-6">
        <Hourglass size={20} className="mr-2 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Hourly Forecast
        </h3>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {hourlyForecast.map(forecast => {
          const date = parseISO(forecast.dt_txt);
          const hourFormatted = format(date, 'h a');
          
          return (
            <ForecastCard
              key={forecast.dt}
              time={hourFormatted}
              temperature={forecast.main.temp}
              iconCode={forecast.weather[0].icon}
              description={forecast.weather[0].description}
              unit={unit}
              isHourly={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;