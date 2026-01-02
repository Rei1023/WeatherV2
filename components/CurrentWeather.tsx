import React from 'react';
import { WeatherSegment } from '../types';
import { getIconClass, getLocalizedDescription } from '../utils';

interface CurrentWeatherProps {
  data: WeatherSegment;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const iconClass = getIconClass(data.weather[0].icon);
  const localizedDesc = getLocalizedDescription(data.weather[0].description);
  
  // Format numbers strictly
  const temp = Math.round(data.main.temp);
  const pop = Math.round(data.pop * 100);
  const rain = data.rain ? data.rain['3h'] : 0;
  const humidity = data.main.humidity;
  const wind = data.wind.speed.toFixed(1);

  return (
    <div className="relative w-full px-4 pt-6 pb-2">
      {/* Glass Card */}
      <div className="
        relative overflow-hidden w-full rounded-[40px] p-6
        bg-gradient-to-br from-white/20 to-white/5 
        backdrop-blur-[30px] 
        border-t border-l border-white/30 border-b border-r border-black/10
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
      ">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col items-center relative z-10 text-white">
          
          {/* Main Icon & Temp */}
          <div className="flex flex-col items-center justify-center mb-2">
            <i className={`${iconClass} text-8xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`}></i>
            <div className="flex items-start">
              <span className="text-[5rem] font-light leading-none tracking-tighter drop-shadow-lg">
                {temp}
              </span>
              <span className="text-4xl mt-2 ml-1 opacity-80">°</span>
            </div>
            <div className="text-xl font-medium mt-2 tracking-widest opacity-90 drop-shadow-md">
              {localizedDesc}
            </div>
          </div>

          {/* Grid Stats */}
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            
            {/* Stat Item: Rain Prob */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-black/10 border border-white/10">
              <span className="text-xs opacity-60 uppercase tracking-wider mb-1">降雨機率</span>
              <span className="text-lg font-bold">{pop}%</span>
            </div>

            {/* Stat Item: Rain Amount */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-black/10 border border-white/10">
              <span className="text-xs opacity-60 uppercase tracking-wider mb-1">累積雨量</span>
              <span className="text-lg font-bold">{rain} mm</span>
            </div>

            {/* Stat Item: Humidity */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-black/10 border border-white/10">
              <span className="text-xs opacity-60 uppercase tracking-wider mb-1">濕度</span>
              <span className="text-lg font-bold">{humidity}%</span>
            </div>

            {/* Stat Item: Wind */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-black/10 border border-white/10">
              <span className="text-xs opacity-60 uppercase tracking-wider mb-1">風速</span>
              <span className="text-lg font-bold">{wind} m/s</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
