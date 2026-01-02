import React, { useState, useEffect } from 'react';
import LocationSelector from './components/LocationSelector';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherBackground from './components/WeatherBackground'; // Import
import { fetchWeatherForecast } from './services/weatherService';
import { processForecastData } from './utils';
import { CITIES } from './constants';
import { City, DailySummary, WeatherTheme, ThemeType } from './types';

// Theme Configuration
const THEMES: Record<ThemeType, WeatherTheme> = {
  [ThemeType.SunnyDay]: {
    bgGradient: 'bg-gradient-to-br from-[#2980b9] to-[#6dd5fa]',
    accentColor: 'from-orange-400 to-yellow-300',
    textColor: 'text-white',
    glassBorder: 'border-white/30',
    glassBg: 'bg-white/20',
  },
  [ThemeType.SunnyNight]: {
    bgGradient: 'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]',
    accentColor: 'from-indigo-400 to-purple-300',
    textColor: 'text-gray-100',
    glassBorder: 'border-white/10',
    glassBg: 'bg-black/20',
  },
  [ThemeType.CloudyDay]: {
    bgGradient: 'bg-gradient-to-br from-[#606c88] to-[#3f4c6b]',
    accentColor: 'from-blue-200 to-gray-200',
    textColor: 'text-white',
    glassBorder: 'border-white/25',
    glassBg: 'bg-white/15',
  },
  [ThemeType.CloudyNight]: {
    bgGradient: 'bg-gradient-to-br from-[#232526] to-[#414345]',
    accentColor: 'from-gray-500 to-gray-400',
    textColor: 'text-gray-200',
    glassBorder: 'border-white/5',
    glassBg: 'bg-white/5',
  },
  [ThemeType.RainyDay]: {
    bgGradient: 'bg-gradient-to-br from-[#373B44] to-[#4286f4]',
    accentColor: 'from-blue-400 to-indigo-500',
    textColor: 'text-white',
    glassBorder: 'border-white/20',
    glassBg: 'bg-white/10',
  },
  [ThemeType.RainyNight]: {
    bgGradient: 'bg-gradient-to-br from-[#000000] to-[#434343]',
    accentColor: 'from-blue-800 to-gray-800',
    textColor: 'text-gray-300',
    glassBorder: 'border-white/5',
    glassBg: 'bg-white/5',
  }
};

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<City>(CITIES[0]);
  const [dailyData, setDailyData] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeType>(ThemeType.SunnyDay);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    loadWeatherData();
  }, [currentCity]);

  useEffect(() => {
    if (dailyData.length > 0) {
      updateTheme(dailyData[0]);
    }
  }, [dailyData]);

  const loadWeatherData = async () => {
    setLoading(true);
    setNotification(null);
    try {
      const response = await fetchWeatherForecast(currentCity.lat, currentCity.lon);
      if (response.list && response.list.length > 0) {
        const processed = processForecastData(response.list);
        setDailyData(processed);
      }
    } catch (e) {
      setNotification("無法取得即時資料，目前顯示模擬數據。");
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = (today: DailySummary) => {
    const currentSegment = today.segments[0];
    const isDay = currentSegment.weather[0].icon.endsWith('d');
    const code = currentSegment.weather[0].id;

    let newTheme = ThemeType.SunnyDay;

    if (code >= 200 && code < 600) {
      newTheme = isDay ? ThemeType.RainyDay : ThemeType.RainyNight;
    } else if (code >= 801) {
      newTheme = isDay ? ThemeType.CloudyDay : ThemeType.CloudyNight;
    } else {
      newTheme = isDay ? ThemeType.SunnyDay : ThemeType.SunnyNight;
    }

    setTheme(newTheme);

    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
      // Extract the 'from' color of the new theme gradient to match status bar
      // This maps the start color of the gradients defined in THEMES
      const themeColors: Record<ThemeType, string> = {
        [ThemeType.SunnyDay]: '#2980b9',
        [ThemeType.SunnyNight]: '#0f2027',
        [ThemeType.CloudyDay]: '#606c88',
        [ThemeType.CloudyNight]: '#232526',
        [ThemeType.RainyDay]: '#373B44',
        [ThemeType.RainyNight]: '#000000',
      };

      themeColorMeta.setAttribute('content', themeColors[newTheme] || '#1e293b');
    }
  };

  const activeTheme = THEMES[theme];

  // Derive current weather conditions for the background component
  const currentWeatherId = dailyData.length > 0 ? dailyData[0].weatherId : 800;
  const isCurrentDay = dailyData.length > 0
    ? dailyData[0].segments[0].weather[0].icon.endsWith('d')
    : true;

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ease-in-out ${activeTheme.bgGradient} flex flex-col items-center relative overflow-hidden`}>

      {/* Background Weather Effects */}
      {!loading && (
        <WeatherBackground weatherId={currentWeatherId} isDay={isCurrentDay} />
      )}

      {/* Container constraint for large screens */}
      {/* Added z-10 to ensure content is above background effects */}
      {/* Added pt-[env(safe-area-inset-top)] to respect mobile safe areas */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative z-10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">

        {/* Header / Location */}
        <LocationSelector currentCity={currentCity} onCityChange={setCurrentCity} />

        {/* Content */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : dailyData.length > 0 ? (
          <div className="flex-1 flex flex-col w-full animate-fade-in-up">

            <CurrentWeather data={dailyData[0].segments[0]} />

            <HourlyForecast data={dailyData[0].segments} />

            <DailyForecast days={dailyData} />

            {/* Attribution */}
            <div className="text-center pb-8 pt-2 opacity-40 text-xs text-white">
              Data provided by OpenWeatherMap
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white">
            <p>暫無天氣資料</p>
          </div>
        )}

        {/* Toast Notification */}
        {notification && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg text-white text-sm shadow-xl whitespace-nowrap animate-bounce">
            {notification}
          </div>
        )}

      </div>

      <style>{`
        /* Existing Animations */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }

        /* New Background Animations */
        @keyframes rain {
          0% { transform: translateY(0); }
          100% { transform: translateY(120vh); }
        }
        
        @keyframes float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default App;
