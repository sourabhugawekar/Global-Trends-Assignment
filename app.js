import { config } from 'dotenv';
import express from 'express';
import newsApiRoutes from "./routes/openWeather.route.js"

const app = express();


config();

app.use("/api",newsApiRoutes)


export default app;