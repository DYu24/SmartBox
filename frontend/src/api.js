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

export const unlockBox = async (phoneNumber, boxId) => {
    const response = await client.post('/api/unreserve', {
        phoneNumber,
        boxId,
    });

    return response.data;
}

export const lockBox = async (boxId) => {
    const response = await client.post(`/api/deliver/${boxId}`);
    return response.data;
}

export const addTrip = async (userId, orders) => {
    const response = await client.post('/api/trips', {
        userId,
        orderIds: orders,
    });

    return response.data;
}