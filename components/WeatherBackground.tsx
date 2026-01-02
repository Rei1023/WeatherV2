import React from 'react';

interface WeatherBackgroundProps {
  weatherId: number;
  isDay: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherId, isDay }) => {
  // Helpers to determine condition
  // Group 2xx: Thunderstorm, 3xx: Drizzle, 5xx: Rain
  const isRainy = weatherId >= 200 && weatherId < 600;
  // Group 800: Clear
  const isClear = weatherId === 800;
  // Group 80x: Clouds
  const isCloudy = weatherId > 800;
  // Group 7xx: Atmosphere (Fog, Mist) - Treat as cloudy/foggy
  const isFoggy = weatherId >= 700 && weatherId < 800;

  // --- 1. Rain Effect ---
  if (isRainy) {
    const drops = Array.from({ length: 30 }); // Generate 30 rain drops
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {drops.map((_, i) => {
          const delay = Math.random() * 2;
          const duration = 0.5 + Math.random() * 0.5;
          const left = Math.random() * 100;
          return (
            <div
              key={i}
              className="absolute top-[-20%] w-[1px] h-[100px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
              style={{
                left: `${left}%`,
                animation: `rain ${duration}s linear infinite`,
                animationDelay: `-${delay}s`,
              }}
            />
          );
        })}
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    );
  }

  // --- 2. Cloudy / Foggy Effect ---
  if (isCloudy || isFoggy) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cloud 1 */}
        <div 
          className="absolute top-[10%] -left-[20%] w-[600px] h-[600px] bg-white/10 blur-[80px] rounded-full animate-[float_20s_infinite_alternate]"
        />
        {/* Cloud 2 */}
        <div 
          className="absolute top-[30%] -right-[20%] w-[500px] h-[500px] bg-white/5 blur-[60px] rounded-full animate-[float_25s_infinite_alternate-reverse]"
        />
         {/* Cloud 3 */}
         <div 
          className="absolute -bottom-[10%] left-[20%] w-[700px] h-[400px] bg-white/5 blur-[90px] rounded-full animate-[float_30s_infinite_alternate]"
        />
      </div>
    );
  }

  // --- 3. Clear Day (Sun) ---
  if (isClear && isDay) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Sun Core */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/30 to-orange-500/0 blur-[60px] rounded-full animate-[pulse-glow_4s_ease-in-out_infinite]" />
        
        {/* Ray 1 */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[100px] bg-white/5 blur-[40px] rotate-[30deg] origin-top-right animate-[float_10s_ease-in-out_infinite]" />
        {/* Ray 2 */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[100px] bg-white/5 blur-[40px] rotate-[60deg] origin-top-right animate-[float_15s_ease-in-out_infinite_reverse]" />
      </div>
    );
  }

  // --- 4. Clear Night (Stars) ---
  if (isClear && !isDay) {
    const stars = Array.from({ length: 40 });
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {stars.map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const size = Math.random() > 0.8 ? 3 : 2;
          return (
            <div
              key={i}
              className={`absolute bg-white rounded-full opacity-0 animate-[twinkle_3s_ease-in-out_infinite]`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.8)`
              }}
            />
          );
        })}
      </div>
    );
  }

  return null;
};

export default React.memo(WeatherBackground);
