import axios from 'axios';


const client = axios.create({
    baseURL:`http://api.openweathermap.org/data/2.5`,
});


// export const getWeatherByCity = async  (city) => {
//     if(!process.env.OPEN_WEATHER_API_KEY) {
//         throw new Error("Env File Error for the open Weather APi ")
//     }

// }

export default client;