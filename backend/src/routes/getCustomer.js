import { getCustomer } from '../database/firestore';

export default {
    method: 'GET',
    path: '/api/customers/{id}',
    handler: async (request, h) => {
        const { id } = request.params;
        try {
            const customer = await getCustomer(id);
            return h.response(customer).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(404);
        }
    }
}
