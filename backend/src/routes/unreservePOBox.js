
import Joi from '@hapi/joi';
import { getPOBox, updatePOBox } from '../database/firestore';
import messagingClient from '../pubsub/Messaging';

const schema = Joi.object().keys({
    phoneNumber: Joi.string(),
});

export default {
    method: 'PUT',
    path: '/api/boxes/{id}',
    handler: async (request, h) => {
        try {
            const { id } = request.params;
            const { phoneNumber } = await schema.validateAsync(request.payload);

            const box = await getPOBox(id);
            const { order, reserved, ...restOfBox } = box;

            // Cannot unreserve a box that is not reserved
            if (!order || !reserved) {
                return h.response({ message: 'Bad Request' }).code(400);
            }

            // Cannot unreserve box if order does not belong to requesting user
            if (phoneNumber !== order.phoneNumber) {
                return h.response({ message: 'Unauthorized' }).code(401);
            }

            const updatedBox = {
                ...restOfBox,
                reserved: false,
            }

            // Publish message for PO box to unlock itself
            messagingClient.publish('unregisterEvent', { id });

            await updatePOBox(updatedBox);
            return h.response({ message: `Successfully freed PO box with id=<${id}>`}).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
