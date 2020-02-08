import { getCourier } from '../database/firestore';

export default {
    method: 'GET',
    path: '/api/couriers/{id}',
    handler: async (request, h) => {
        const { id } = request.params;
        try {
            const courier = await getCourier(id);
            return h.response(courier).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(404);
        }
    }
}
