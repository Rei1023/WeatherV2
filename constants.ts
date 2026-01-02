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
  // 晴朗與雲量系列
  'clear sky': '晴',
  'sky is clear': '晴',
  'few clouds': '晴時多雲',
  'scattered clouds': '多雲時晴',
  'broken clouds': '多雲',
  'overcast clouds': '陰',

  // 保濕噴霧系列 (原毛毛雨)
  'light intensity drizzle': '局部保濕噴霧',
  'drizzle': '保濕噴霧',
  'heavy intensity drizzle': '強力保濕噴霧',
  'light intensity drizzle rain': '局部保濕噴霧',
  'drizzle rain': '保濕噴霧',
  'heavy intensity drizzle rain': '強力保濕噴霧',
  'shower rain and drizzle': '陣性保濕噴霧',
  'heavy shower rain and drizzle': '強力陣性保濕噴霧',
  'shower drizzle': '陣性保濕噴霧',

  // 雷雨系列
  'thunderstorm with light rain': '短暫雷陣雨',
  'thunderstorm with rain': '雷陣雨伴隨雨',
  'thunderstorm': '雷陣雨',
  'thunderstorm with heavy rain': '雷雨並有大雨',
  'light thunderstorm': '短暫雷陣雨',
  'heavy thunderstorm': '強雷陣雨',
  'ragged thunderstorm': '雷陣雨',
  'thunderstorm with light drizzle': '雷陣雨伴隨保濕噴霧',
  'thunderstorm with drizzle': '雷陣雨伴隨保濕噴霧',
  'thunderstorm with heavy drizzle': '雷陣雨伴隨強力保濕噴霧',

  // 降雨與陣雨系列
  'light rain': '短暫雨',
  'moderate rain': '有雨',
  'heavy intensity rain': '大雨',
  'very heavy rain': '豪雨',
  'extreme rain': '大豪雨',
  'freezing rain': '凍雨',
  'light intensity shower rain': '局部短暫陣雨',
  'shower rain': '短暫陣雨',
  'heavy intensity shower rain': '短暫大雨',
  'ragged shower rain': '短暫陣雨',

  // 大氣現象系列
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

  // Chinese API response mapping (Aligned with new terms)
  '晴，少雲': '晴時多雲',
  '晴，多雲': '多雲時晴',
  '碎雲': '多雲',
  '厚雲': '陰',
  '強度雨': '大雨',
  '小雨': '短暫雨',
  '中雨': '有雨',
  '大雨': '大雨',
};
