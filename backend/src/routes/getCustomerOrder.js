import { getCustomerOrder } from '../database/firestore';

export default {
    method: 'GET',
    path: '/api/orders/{id}',
    handler: async (request, h) => {
        const { id } = request.params;

        try {
            return await getCustomerOrder(id);
        } catch (error) {
            return h.response({ message: error.message }).code(404);
        }
    }
}