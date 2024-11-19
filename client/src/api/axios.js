import axios from 'axios';
// const BASE_URL = 'hosted/be/url';
const BASE_URL = 'http://localhost:3000';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
});