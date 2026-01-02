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

// Localization Dictionary
export const WEATHER_TRANSLATIONS: Record<string, string> = {
  'sky is clear': '晴朗無雲',
  'clear sky': '晴朗無雲',
  'few clouds': '多雲時晴', // '晴，少雲' -> '多雲時晴'
  'scattered clouds': '晴時多雲', // '晴，多雲' -> '晴時多雲'
  'broken clouds': '多雲', // '碎雲' -> '多雲'
  'overcast clouds': '陰天', // '厚雲' -> '陰天'
  'light rain': '小雨',
  'moderate rain': '中雨',
  'heavy intensity rain': '豪雨', // '強度雨' -> '豪雨'
  'very heavy rain': '大豪雨',
  'extreme rain': '超大豪雨',
  'freezing rain': '凍雨',
  'light intensity shower rain': '短暫陣雨',
  'shower rain': '陣雨',
  'heavy intensity shower rain': '強陣雨',
  'thunderstorm': '雷雨',
  'thunderstorm with light rain': '雷雨',
  'thunderstorm with rain': '雷雨',
  'thunderstorm with heavy rain': '強雷雨',
};
