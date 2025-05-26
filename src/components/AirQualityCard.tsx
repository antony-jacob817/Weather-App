import React from "react";
import { Wind } from "lucide-react";
import { AirQualityData } from "../types/weather";
import { getAirQualityLabel, getAirQualityColor } from "../utils/helpers";

interface AirQualityCardProps {
  airQualityData: AirQualityData;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQualityData }) => {
  const airQuality = airQualityData.list[0];
  const aqi = airQuality.main.aqi;
  const label = getAirQualityLabel(aqi);
  const color = getAirQualityColor(aqi);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center mb-4 sm:mb-6">
        <Wind size={20} className="mr-2 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Air Quality Index
        </h3>
      </div>

      <div className="relative mb-3 sm:mb-3">
        {/* Centered AQI Circle */}
        <div className="mx-auto rounded-full p-8 sm:p-10">
          <div className="mx-auto w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] relative z-10 bg-white dark:bg-gray-800 rounded-full p-2">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
                className="dark:stroke-gray-700"
              />
              <path
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeDasharray={`${aqi * 20}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                {aqi}/5
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                AQI
              </span>
              <div
                className="text-xs sm:text-sm font-medium text-center mt-1 px-2 sm:px-3 py-1 rounded-full mx-auto w-fit"
                style={{ color }}
              >
                {label}
              </div>
            </div>
          </div>
        </div>

        {/* Surrounding Boxes */}
        <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-3">
          {/* Top Left (PM2.5) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl rounded-br-xl h-[90px] sm:h-[110px]">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              PM2.5
            </div>
            <div className="font-medium text-lg sm:text-xl text-gray-800 dark:text-white">
              {airQuality.components.pm2_5.toFixed(1)} µg/m³
            </div>
          </div>

          {/* Top Right (PM10) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl rounded-br-xl h-[90px] sm:h-[110px]">
            <div className="text-xs sm:text-sm text-right text-gray-500 dark:text-gray-400 mb-1">
              PM10
            </div>
            <div className="font-medium text-lg sm:text-xl text-right text-gray-800 dark:text-white">
              {airQuality.components.pm10.toFixed(1)} µg/m³
            </div>
          </div>

          {/* Bottom Left (O₃) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl rounded-tl-xl h-[90px] sm:h-[110px]">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              O₃
            </div>
            <div className="font-medium text-lg sm:text-xl text-gray-800 dark:text-white">
              {airQuality.components.o3.toFixed(1)} µg/m³
            </div>
          </div>

          {/* Bottom Right (NO₂) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-xl rounded-tr-xl h-[90px] sm:h-[110px]">
            <div className="text-xs sm:text-sm text-right text-gray-500 dark:text-gray-400 mb-1">
              NO₂
            </div>
            <div className="font-medium text-lg sm:text-xl text-right text-gray-800 dark:text-white">
              {airQuality.components.no2.toFixed(1)} µg/m³
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;