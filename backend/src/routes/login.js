import { login } from '../database/firestore';

export default {
    method: 'POST',
    path: '/api/login',
    handler: async (request, h) => {
        const { phoneNumber } = request.payload;
        try {
            const user = await login(phoneNumber);
            return h.response(user).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ status: error.message }).code(401);
        }
    }
}