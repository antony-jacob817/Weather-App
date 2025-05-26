import React from 'react';
import { CalendarRange } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { ForecastData } from '../types/weather';
import { groupForecastByDay } from '../utils/helpers';
import ForecastCard from './ForecastCard';

interface DailyForecastProps {
  forecastData: ForecastData;
  unit: 'metric' | 'imperial';
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecastData, unit }) => {
  const groupedForecast = groupForecastByDay(forecastData.list);
  
  // Take only the next 5 days (including today)
  const fiveDayForecast = groupedForecast.slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2x1 mt-6">
      <div className="flex items-center mb-4 sm:mb-6">
        <CalendarRange size={20} className="mr-2 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          5-Day Forecast
        </h3>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {fiveDayForecast.map((dayData, index) => {
          // Use noon forecast or the middle of the day for the daily representation
          const middleIndex = Math.floor(dayData.length / 2);
          const forecast = dayData[middleIndex];
          
          // Get the day name
          const date = parseISO(forecast.dt_txt);
          const dayName = index === 0 ? 'Today' : format(date, 'EEE');
          
          return (
            <ForecastCard
              key={forecast.dt}
              time={dayName}
              temperature={forecast.main.temp}
              iconCode={forecast.weather[0].icon}
              description={forecast.weather[0].description}
              unit={unit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;