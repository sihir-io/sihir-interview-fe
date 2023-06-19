// Create a new axios instance
import axios from 'axios'

const sihirApiClient = axios.create({
    baseURL: 'https://sihir-containerized-api.azurewebsites.net/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',

    }
});


export default sihirApiClient;