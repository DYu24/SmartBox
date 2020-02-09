import axios from 'axios';

const API_HOST = 'localhost:5000';
const BASE_URL = `http://${API_HOST}`;

const client = axios.create({
    baseURL: BASE_URL,
});

export const login = async (phoneNumber) => {
    const response = await client.post('/api/login', {
        phoneNumber,
    });

    return response.data;
};