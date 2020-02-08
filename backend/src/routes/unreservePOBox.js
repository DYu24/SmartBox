import { getPOBox, updatePOBox } from '../database/firestore';

export default {
    method: 'PUT',
    path: '/api/boxes/{id}',
    handler: async (request, h) => {
        try {
            const { id } = request.params;
            const box = await getPOBox(id);
            const { order, ...restOfBox } = box;
            const updatedBox = {
                ...restOfBox,
                reserved: false,
            }

            await updatePOBox(updatedBox);
            return h.response().code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
