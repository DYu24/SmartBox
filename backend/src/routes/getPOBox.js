import { getPOBox } from '../database/firestore';

export default {
    method: 'GET',
    path: '/api/boxes/{id}',
    handler: async (request, h) => {
        const { id } = request.params;

        try {
            const poBox = await getPOBox(id);
            return h.response(poBox).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(404);
        }
    }
}
