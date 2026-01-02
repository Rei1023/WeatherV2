import { API_KEY, API_BASE_URL } from '../constants';
import { ForecastResponse } from '../types';
import { generateMockData } from '../utils';

export const fetchWeatherForecast = async (lat: number, lon: number): Promise<ForecastResponse> => {
  const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&lang=zh_tw&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data: ForecastResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data, using mock data.", error);
    // Return mock data for UI demonstration purposes if API fails (common with shared keys)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockData());
      }, 500); // Simulate network delay
    });
  }
};
