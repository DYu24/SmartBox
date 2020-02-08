import { getTrips } from '../database/firestore';

export default {
    method: 'GET',
    path: '/api/trips/{userId}',
    handler: async (request, h) => {
        const { userId } = request.params;

        try {
            const trips = await getTrips(userId);
            return h.response(trips).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}