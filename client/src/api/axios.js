import axios from 'axios';
// const BASE_URL = 'hosted/be/url';
const BASE_URL = 'https://viego-api.onrender.com';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
});