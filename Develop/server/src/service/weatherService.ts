import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationData {
  lat: number;
  lon: number;
}

interface WeatherData {
  list: {
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    dt_txt: string;
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
  city: {
    name: string;
  };
}

class Weather {
  cityName: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  forecast: any[];

  constructor(cityName: string, temperature: number, windSpeed: number, humidity: number, forecast: any[]) {
    this.cityName = cityName;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.forecast = forecast;
  }
}

class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = process.env.OPENWEATHER_API_KEY || '';

  private async fetchLocationData(query: string): Promise<LocationData> {
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(geocodeURL);
    const data = await response.json() as LocationData[];  // Explicitly cast to LocationData[]
    
    if (data.length === 0) {
      throw new Error('Location not found');
    }
    
    return data[0];
  }

  private destructureLocationData(locationData: LocationData): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<WeatherData> {
    const weatherURL = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherURL);
    const data = await response.json() as WeatherData;  // Explicitly cast to WeatherData
    return data;
  }

  private parseCurrentWeather(data: WeatherData): Weather {
    const current = data.list[0];
    const forecast = data.list.slice(1, 6);
    return new Weather(
      data.city.name,
      current.main.temp,
      current.wind.speed,
      current.main.humidity,
      forecast
    );
  }

  async getWeatherForCity(city: string): Promise<Weather> {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
