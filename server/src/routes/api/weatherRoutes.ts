import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.city;

    if (!cityName) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(cityName);

    console.log('Weather Data Sent to Frontend:', weatherData); // Debug log

    await HistoryService.addCity(cityName);
    console.log('Weather Data Sent to Frontend:', weatherData);
    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error in POST /api/weather:', error); // Debug log
    return res.status(500).json({ message: 'Error retrieving weather data', error });
  }
});

router.get('/history', async (_, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error in GET /api/weather/history:', error); // Debug log
    return res.status(500).json({ message: 'Error retrieving search history', error });
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;
    await HistoryService.removeCity(cityId);
    return res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    console.error('Error in DELETE /api/weather/history/:id:', error); // Debug log
    return res.status(500).json({ message: 'Error removing city from history', error });
  }
});

export default router;
