import axios from 'axios';
// const BASE_URL = 'localhost:3000';

export default axios.create({
    // baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
});