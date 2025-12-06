import client from "../utils/axios.util.js";
import asyncHandler from "express-async-handler";
import cache from "../utils/cache.util.js";

const openWeatherApiController = {
    getWeatherByCity: asyncHandler(async (req, res) => {
        const city = req.params.city.toLowerCase();
        const cacheKey = `weather_${city}`;

        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                data: cachedData,
                cached: true,
                message: "Weather fetched from cache"
            });
        }
        const response = await client.get(`/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`);

        if (response.status !== 200) {
            return res.status(400).json({ message: "Unexpected Error!" });
        }

        const { data } = response;

        // 3️⃣ Store in cache
        cache.set(cacheKey, data);

        res.status(200).json({
            data,
            cached: false,
            message: "Weather fetched successfully"
        });
    }),

    forecastByCity: asyncHandler(async (req, res) => {
        const city = req.params.city.toLowerCase();
        const cacheKey = `forecast_${city}`;

        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                data: cachedData,
                cached: true,
                message: "Forecast fetched from cache"
            });
        }
        const response = await client.get(`/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`);

        if (response.status !== 200) {
            return res.status(400).json({ message: "Unexpected Error!" });
        }

        const { data } = response;

        cache.set(cacheKey, data);

        res.status(200).json({
            data,
            cached: false,
            message: "City forecast fetched successfully"
        });
    }),

    getWeatherByCoordinates: asyncHandler(async (req, res) => {
        const { lat, lon } = req.query;
        const cacheKey = `coords_${lat}_${lon}`;

        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                data: cachedData,
                cached: true,
                message: "Weather by coordinates fetched from cache"
            });
        }

        const response = await client.get(`/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        const { data } = response;

        cache.set(cacheKey, data);

        res.status(200).json({
            data,
            cached: false,
            message: "Weather by coordinates fetched successfully"
        });
    })
};

export default openWeatherApiController;
