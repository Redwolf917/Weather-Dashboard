import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService';
import WeatherService from '../../service/weatherService';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.city;

    if (!cityName) {
      return res.status(400).json({ message: 'City name is required' });
    }

    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // Save city to search history
    await HistoryService.addCity(cityName);

    // Return weather data to client
    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving weather data', error });
  }
});

// GET search history
router.get('/history', async (_, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving search history', error });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;
    await HistoryService.removeCity(cityId);
    return res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing city from history', error });
  }
});

export default router;
