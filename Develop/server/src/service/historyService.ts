import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HistoryService {
  private filePath = path.resolve(__dirname, '../../db/searchHistory.json');

  async read(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading history file:', error);
      return [];
    }
  }

  async write(data: any[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing history file:', error);
    }
  }

  async addCity(city: string): Promise<void> {
    const history = await this.read();
    if (!history.includes(city)) {
      history.push(city);
      await this.write(history);
    }
  }

  async getCities(): Promise<string[]> {
    return await this.read();
  }

  async removeCity(city: string): Promise<void> {
    const history = await this.read();
    const updatedHistory = history.filter((c) => c !== city);
    await this.write(updatedHistory);
  }
}

export default new HistoryService();
