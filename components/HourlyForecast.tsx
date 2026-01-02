import React from 'react';
import { WeatherSegment } from '../types';
import { getIconClass, formatTime } from '../utils';

interface HourlyForecastProps {
  data: WeatherSegment[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  // Only show next 24 hours (approx 8 segments of 3 hours)
  const next24Hours = data.slice(0, 9);

  return (
    <div className="w-full mt-4 mb-4">
      <div className="px-6 mb-2">
        <h3 className="text-white/80 text-sm font-bold uppercase tracking-widest">每3小時預報</h3>
      </div>
      
      <div className="w-full overflow-x-auto no-scrollbar pl-4 pr-4 pb-4">
        <div className="flex gap-3 w-max">
          {next24Hours.map((segment, index) => {
            const iconClass = getIconClass(segment.weather[0].icon);
            const time = formatTime(segment.dt_txt);
            const temp = Math.round(segment.main.temp);
            const pop = Math.round(segment.pop * 100);
            const rain = segment.rain ? segment.rain['3h'] : 0;

            return (
              <div 
                key={segment.dt} 
                className={`
                  flex flex-col items-center justify-between
                  min-w-[85px] h-[150px] p-3 rounded-[25px]
                  backdrop-blur-md border border-white/10 shadow-lg
                  ${index === 0 ? 'bg-white/20 border-white/40' : 'bg-black/10'}
                `}
              >
                <span className="text-white text-sm font-medium opacity-90">{time}</span>
                
                <i className={`${iconClass} text-2xl text-white my-2`}></i>
                
                <span className="text-white text-xl font-bold">{temp}°</span>
                
                <div className="flex flex-col items-center mt-1">
                   {/* Always show rain data even if 0 */}
                   <span className="text-[10px] text-blue-200 font-bold">{pop}%</span>
                   <span className="text-[10px] text-white/60">{rain}mm</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
