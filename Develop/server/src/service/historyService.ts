import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

class HistoryService {
  private historyFilePath = './server/db/searchHistory.json';

  private async read(): Promise<City[]> {
    try {
      const data = await readFile(this.historyFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await writeFile(this.historyFilePath, JSON.stringify(cities, null, 2));
  }

  async getCities(): Promise<City[]> {
    return this.read();
  }

  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
