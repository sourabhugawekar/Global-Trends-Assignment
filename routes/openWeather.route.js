import {Router} from 'express';
import openWeatherApiController from '../controllers/openWeather.controller.js';

const router = Router();

router.get("/weather/:city",openWeatherApiController.getWeatherByCity);
router.get("/forecast/:city",openWeatherApiController.forecastByCity);
router.get("/coordinates",openWeatherApiController.getWeatherByCoordinates)

export default router;

