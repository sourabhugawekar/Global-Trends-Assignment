import axios from 'axios';


const client = axios.create({
    baseURL:`http://api.openweathermap.org/data/2.5`,
});


export default client;