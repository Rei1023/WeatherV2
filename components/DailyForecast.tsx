import React, { useState } from 'react';
import { DailySummary } from '../types';
import { getIconClass, formatTime } from '../utils';

interface DailyForecastProps {
  days: DailySummary[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ days }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDay = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full px-4 pb-10">
      <div className="px-2 mb-3">
        <h3 className="text-white/80 text-sm font-bold uppercase tracking-widest">未來一週預報</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        {days.map((day, index) => {
          const isExpanded = expandedIndex === index;
          const iconClass = getIconClass(day.icon);

          return (
            <div 
              key={day.date}
              onClick={() => toggleDay(index)}
              className={`
                group relative overflow-hidden rounded-[30px]
                transition-all duration-300 ease-out cursor-pointer
                bg-white/10 backdrop-blur-md border border-white/20 shadow-md
                hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]
                ${isExpanded ? 'bg-white/15 ring-1 ring-white/30' : 'hover:bg-white/15'}
              `}
            >
              {/* Header */}
              <div className="relative overflow-hidden flex items-center justify-between p-5">
                
                {/* Shimmer Effect */}
                <div className={`
                  absolute inset-0 -translate-x-full pointer-events-none z-0
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  ${isExpanded ? 'animate-[shimmer_3s_infinite]' : 'group-hover:animate-[shimmer_1.5s_infinite]'}
                `}></div>

                <div className="relative z-10 flex items-baseline gap-2 w-1/3">
                  <span className="text-white font-bold text-lg">{day.dayOfWeek}</span>
                  <span className="text-white/60 text-sm font-semibold">{day.dateDisplay}</span>
                </div>

                <div className="relative z-10 flex items-center justify-center w-1/3">
                  <i className={`${iconClass} text-2xl text-white drop-shadow-md`}></i>
                </div>

                <div className="relative z-10 flex items-center justify-end gap-3 w-1/3">
                  <span className="text-white font-bold text-lg">{day.maxTemp}°</span>
                  <span className="text-white/50 font-medium text-lg">{day.minTemp}°</span>
                </div>
              </div>

              {/* Content (Detailed 3h segments for that day) */}
              <div 
                className={`
                  transition-[max-height, opacity] duration-500 ease-in-out overflow-hidden
                  ${isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="w-full overflow-x-auto no-scrollbar p-4 pt-0 border-t border-white/10 bg-black/5">
                   <div className="flex gap-2 pt-4">
                     {day.segments.map((seg) => {
                        const segTime = formatTime(seg.dt_txt);
                        const segIcon = getIconClass(seg.weather[0].icon);
                        const segRain = seg.rain ? seg.rain['3h'] : 0;
                        const segPop = Math.round(seg.pop * 100);

                        return (
                          <div key={seg.dt} className="flex flex-col items-center min-w-[70px] p-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs text-white/70 mb-1">{segTime}</span>
                            <i className={`${segIcon} text-lg text-white mb-1`}></i>
                            <span className="text-sm font-bold text-white mb-1">{Math.round(seg.main.temp)}°</span>
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] text-blue-300">{segPop}%</span>
                              <span className="text-[10px] text-white/40">{segRain}</span>
                            </div>
                          </div>
                        )
                     })}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;