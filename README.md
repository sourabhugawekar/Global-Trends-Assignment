# GlobalTrends - Weather API Integration

A RESTful API service that integrates with the OpenWeather API to provide weather data and forecasts with built-in caching for improved performance.

## 📋 Overview

This project is an API integration assignment that fetches weather data from the OpenWeather API. It includes features like city-based weather queries, 5-day forecasts, coordinate-based searches, and an in-memory caching system to reduce API calls and improve response times.

## ✨ Features

- **Current Weather by City**: Get real-time weather data for any city
- **5-Day Forecast**: Retrieve weather forecasts for the next 5 days
- **Coordinates Search**: Fetch weather data using latitude and longitude
- **In-Memory Caching**: Automatic caching with 5-minute TTL to optimize API usage
- **Error Handling**: Robust async error handling with express-async-handler
- **Metric Units**: Weather data returned in metric units (Celsius, km/h)

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
- **express-async-handler** - Async/await error handling

## 📁 Project Structure

```
GlobalTrends/
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── package.json                    # Dependencies and scripts
├── .gitignore                      # Git ignore rules
├── controllers/
│   └── openWeather.controller.js   # Weather API controllers
├── routes/
│   └── openWeather.route.js        # API routes
└── utils/
    ├── axios.util.js               # Axios client configuration
    └── cache.util.js               # In-memory cache implementation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API Key ([Get one here](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GlobalTrends
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPEN_WEATHER_API_KEY=your_api_key_here
PORT_NUM=4000
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## 📡 API Endpoints

### 1. Get Current Weather by City

```http
GET /api/weather/:city
```

**Example:**
```bash
GET http://localhost:4000/api/weather/london
```

**Response:**
```json
{
  "data": {
    "coord": { "lon": -0.1257, "lat": 51.5085 },
    "weather": [...],
    "main": {
      "temp": 15.2,
      "feels_like": 14.8,
      "humidity": 72
    },
    "name": "London"
  },
  "cached": false,
  "message": "Weather fetched successfully"
}
```

### 2. Get 5-Day Forecast by City

```http
GET /api/forecast/:city
```

**Example:**
```bash
GET http://localhost:4000/api/forecast/paris
```

**Response:**
```json
{
  "data": {
    "list": [...],
    "city": {
      "name": "Paris",
      "country": "FR"
    }
  },
  "cached": false,
  "message": "City forecast fetched successfully"
}
```

### 3. Get Weather by Coordinates

```http
GET /api/coordinates?lat={latitude}&lon={longitude}
```

**Example:**
```bash
GET http://localhost:4000/api/coordinates?lat=40.7128&lon=-74.0060
```

**Response:**
```json
{
  "data": {
    "coord": { "lon": -74.006, "lat": 40.7128 },
    "weather": [...],
    "main": {
      "temp": 18.5,
      "feels_like": 17.9
    },
    "name": "New York"
  },
  "cached": false,
  "message": "Weather by coordinates fetched successfully"
}
```

## 🗄️ Caching System

The application implements an in-memory caching system with the following features:

- **Default TTL**: 5 minutes (300,000 ms)
- **Cache Keys**: 
  - Weather: `weather_{city}`
  - Forecast: `forecast_{city}`
  - Coordinates: `coords_{lat}_{lon}`
- **Automatic Expiry**: Cached entries are automatically invalidated after TTL
- **Cache Indicator**: Responses include a `cached` boolean field

## 🔧 Development

### Run in Development Mode

```bash
npm run dev
```

This uses Node's `--watch` flag to automatically restart the server on file changes.

### Project Scripts

- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (not yet configured)

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPEN_WEATHER_API_KEY` | Your OpenWeather API key | Yes |
| `PORT_NUM` | Server port (default: 4000) | No |

## 📝 Notes

- All city names are converted to lowercase for consistent caching
- Weather data is returned in metric units (Celsius, meters/sec)
- The cache uses an in-memory Map, so data is lost on server restart
- Error handling is managed through express-async-handler for cleaner async/await code

## 🔒 Security Considerations

- API keys are stored in `.env` file (not committed to version control)
- Consider implementing rate limiting for production use
- Add request validation middleware for enhanced security

## 🚧 Future Enhancements

- Add request validation using Joi or Zod
- Implement persistent caching with Redis
- Add unit and integration tests
- Include API rate limiting
- Add logging middleware (Morgan or Winston)
- Implement error middleware for custom error responses
- Add API documentation with Swagger/OpenAPI

## 📄 License

ISC

## 👤 Author

Global Trends Assignment

---

**Assignment Purpose**: API Integration with OpenWeather API, demonstrating RESTful API design, caching strategies, and modern Node.js development practices.
