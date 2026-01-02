import { City } from './types';

// Provided API Key
export const API_KEY = 'c00d0cc3188c4f8f963dfba54b8e05f1';
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const CITIES: City[] = [
  { name: '台北市', lat: 25.0330, lon: 121.5654 },
  { name: '桃園市', lat: 24.9725, lon: 121.2255 },
  { name: '苗栗縣', lat: 24.5602, lon: 120.8214 },
  { name: '台中市', lat: 24.1477, lon: 120.6736 },
  { name: '台南市', lat: 22.9997, lon: 120.2270 },
  { name: '高雄市', lat: 22.6273, lon: 120.3014 }, // Added for completeness
  { name: '花蓮縣', lat: 23.9872, lon: 121.6011 }, // Added for completeness
];

export const WEATHER_TRANSLATIONS: Record<string, string> = {
  // 雲量系列 (Cloudiness)
  'clear sky': '晴',
  'sky is clear': '晴',
  'few clouds': '晴時多雲',      // 801
  'scattered clouds': '晴時多雲', // 802
  'broken clouds': '多雲',        // 803
  'overcast clouds': '陰天',      // 804

  // 降雨與細雨簡化 (Rain & Drizzle -> 小雨/陣雨/大雨)
  // Drizzle (細雨)
  'light intensity drizzle': '小雨',
  'drizzle': '小雨',
  'heavy intensity drizzle': '小雨',
  'light intensity drizzle rain': '小雨',
  'drizzle rain': '小雨',
  'heavy intensity drizzle rain': '小雨',
  'shower drizzle': '陣雨',

  // Rain (雨)
  'light rain': '小雨',
  'moderate rain': '大雨',       // Simplified to 大雨 as it's significant
  'heavy intensity rain': '大雨',
  'very heavy rain': '大雨',
  'extreme rain': '大雨',
  'freezing rain': '大雨',

  // Shower Rain (陣雨)
  'light intensity shower rain': '陣雨',
  'shower rain': '陣雨',
  'heavy intensity shower rain': '陣雨',
  'ragged shower rain': '陣雨',

  // Thunderstorm (雷雨 -> 雷陣雨)
  'thunderstorm with light rain': '雷陣雨',
  'thunderstorm with rain': '雷陣雨',
  'thunderstorm with heavy rain': '雷陣雨',
  'light thunderstorm': '雷陣雨',
  'thunderstorm': '雷陣雨',
  'heavy thunderstorm': '雷陣雨',
  'ragged thunderstorm': '雷陣雨',
  'thunderstorm with light drizzle': '雷陣雨',
  'thunderstorm with drizzle': '雷陣雨',
  'thunderstorm with heavy drizzle': '雷陣雨',

  // 大氣現象 (Atmosphere) - Keep standard localized terms
  'mist': '薄霧',
  'smoke': '煙霧',
  'haze': '霾',
  'sand/dust whirls': '塵捲風',
  'fog': '濃霧',
  'sand': '揚塵',
  'dust': '揚塵',
  'volcanic ash': '火山灰',
  'squalls': '強陣風',
  'tornado': '龍捲風',

  // Custom API response mapping (Chinese fallback)
  '晴，少雲': '晴時多雲',
  '晴，多雲': '晴時多雲',
  '碎雲': '多雲',
  '厚雲': '陰天',
  '小雨': '小雨',
  '中雨': '中雨',
  '大雨': '大雨',
  '強度雨': '大雨',
  '陣雨': '陣雨',
  '雷雨': '雷陣雨',
};
