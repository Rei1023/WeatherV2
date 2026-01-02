export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherSegment {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number; // Probability of precipitation (0-1)
  rain?: {
    "3h": number;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherSegment[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface DailySummary {
  date: string; // YYYY-MM-DD
  dateDisplay: string; // MM/DD
  dayOfWeek: string; // 週一
  minTemp: number;
  maxTemp: number;
  icon: string; // Most frequent icon or noon icon
  weatherId: number;
  description: string;
  segments: WeatherSegment[];
}

export enum ThemeType {
  SunnyDay = 'SUNNY_DAY',
  SunnyNight = 'SUNNY_NIGHT',
  CloudyDay = 'CLOUDY_DAY',
  CloudyNight = 'CLOUDY_NIGHT',
  RainyDay = 'RAINY_DAY',
  RainyNight = 'RAINY_NIGHT',
}

export interface WeatherTheme {
  bgGradient: string;
  accentColor: string;
  textColor: string;
  glassBorder: string;
  glassBg: string;
}
