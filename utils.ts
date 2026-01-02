import { WeatherSegment, DailySummary, ForecastResponse } from './types';
import { WEATHER_TRANSLATIONS } from './constants';

// --- Icon Mapping ---
export const getIconClass = (iconCode: string): string => {
  const prefix = 'wi wi-';
  const code = iconCode.substring(0, 2);
  const isDay = iconCode.endsWith('d');

  switch (code) {
    case '01': return prefix + (isDay ? 'day-sunny' : 'night-clear');
    case '02': return prefix + (isDay ? 'day-cloudy' : 'night-alt-cloudy');
    case '03': return prefix + 'cloud';
    case '04': return prefix + 'cloudy';
    case '09': return prefix + 'showers';
    case '10': return prefix + (isDay ? 'day-rain' : 'night-alt-rain');
    case '11': return prefix + 'thunderstorm';
    case '13': return prefix + 'snow';
    case '50': return prefix + 'fog';
    default: return prefix + 'na';
  }
};

// --- Localization ---
export const getLocalizedDescription = (description: string): string => {
  const lowerDesc = description.toLowerCase();
  return WEATHER_TRANSLATIONS[lowerDesc] || description;
};

// --- Date Formatting ---
export const formatDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString.replace(/-/g, '/')); // Fix for iOS Safari date parsing
  const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  return days[date.getDay()];
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString.replace(/-/g, '/'));
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const formatTime = (dateTxt: string): string => {
  const date = new Date(dateTxt.replace(/-/g, '/'));
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minStr}`;
};

// --- Data Aggregation ---
export const processForecastData = (list: WeatherSegment[]): DailySummary[] => {
  const grouped: Record<string, WeatherSegment[]> = {};

  // Group by date
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  const dailySummaries: DailySummary[] = Object.keys(grouped).map(date => {
    const segments = grouped[date];
    const dateObj = new Date(date);
    
    // Calculate min/max temp
    let minTemp = 100;
    let maxTemp = -100;
    
    // Determine most frequent icon or take noon icon
    const iconCounts: Record<string, number> = {};
    let representativeIcon = segments[0].weather[0].icon;
    let representativeId = segments[0].weather[0].id;
    let representativeDesc = segments[0].weather[0].description;

    segments.forEach(seg => {
      if (seg.main.temp_min < minTemp) minTemp = seg.main.temp_min;
      if (seg.main.temp_max > maxTemp) maxTemp = seg.main.temp_max;
      
      const icon = seg.weather[0].icon;
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;

      // Prefer noon data (around 12:00) for "daily" icon if available
      if (seg.dt_txt.includes('12:00:00')) {
        representativeIcon = icon;
        representativeId = seg.weather[0].id;
        representativeDesc = seg.weather[0].description;
      }
    });

    return {
      date,
      dateDisplay: formatDateShort(date),
      dayOfWeek: formatDayOfWeek(date),
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      icon: representativeIcon,
      weatherId: representativeId,
      description: getLocalizedDescription(representativeDesc),
      segments
    };
  });

  // Limit to 5 days if API returns more crossing the day boundary
  return dailySummaries.slice(0, 6); // Keep today + 5 days
};


// --- Mock Data Generator (Fallback) ---
export const generateMockData = (): ForecastResponse => {
  const now = new Date();
  const list: WeatherSegment[] = [];

  for (let i = 0; i < 40; i++) {
    const forecastTime = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
    const isDay = forecastTime.getHours() > 6 && forecastTime.getHours() < 18;
    
    list.push({
      dt: Math.floor(forecastTime.getTime() / 1000),
      main: {
        temp: 20 + Math.random() * 10,
        feels_like: 22,
        temp_min: 18 + Math.random() * 5,
        temp_max: 25 + Math.random() * 5,
        pressure: 1012,
        humidity: 60 + Math.floor(Math.random() * 30),
      },
      weather: [{
        id: 800,
        main: 'Clear',
        description: Math.random() > 0.5 ? 'clear sky' : 'broken clouds',
        icon: isDay ? (Math.random() > 0.5 ? '01d' : '04d') : (Math.random() > 0.5 ? '01n' : '04n'),
      }],
      clouds: { all: 20 },
      wind: { speed: 3 + Math.random() * 5, deg: 180 },
      visibility: 10000,
      pop: Math.random() * 0.5,
      rain: Math.random() > 0.7 ? { '3h': Math.random() * 5 } : undefined,
      dt_txt: forecastTime.toISOString().replace('T', ' ').substring(0, 19),
    });
  }

  return {
    cod: "200",
    message: 0,
    cnt: 40,
    list: list,
    city: {
      id: 1,
      name: "Mock Taipei",
      coord: { lat: 25.0330, lon: 121.5654 },
      country: "TW",
      population: 0,
      timezone: 28800,
      sunrise: 1600000000,
      sunset: 1600040000,
    }
  };
};
