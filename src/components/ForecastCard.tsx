import React from 'react';
import { formatTemperature, formatTime, getWeatherIconUrl } from '../utils/helpers';

interface ForecastItemProps {
  time: string;
  temperature: number;
  iconCode: string;
  description: string;
  unit: 'metric' | 'imperial';
  isHourly?: boolean;
}

const ForecastCard: React.FC<ForecastItemProps> = ({
  time,
  temperature,
  iconCode,
  description,
  unit,
  isHourly = false
}) => {
  return (
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {time}
      </div>
      <img 
        src={getWeatherIconUrl(iconCode)} 
        alt={description}
        className="w-12 h-12 my-1"
      />
      <div className="text-lg font-semibold text-gray-800 dark:text-white">
        {formatTemperature(temperature, unit)}
      </div>
      {!isHourly && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 capitalize">
          {description}
        </div>
      )}
    </div>
  );
};

export default ForecastCard;