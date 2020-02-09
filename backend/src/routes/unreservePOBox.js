
import Joi from '@hapi/joi';
import { getPOBox, updatePOBox } from '../database/firestore';
import messagingClient from '../pubsub/Messaging';
import { PO_BOX_UNREGISTERED_EVENT } from '../pubsub/events';

const schema = Joi.object().keys({
    phoneNumber: Joi.string(),
    boxId: Joi.string(),
});

export default {
    method: 'POST',
    path: '/api/unreserve',
    handler: async (request, h) => {
        try {
            const { boxId, phoneNumber } = await schema.validateAsync(request.payload);
            const box = await getPOBox(boxId);
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
            messagingClient.publish(PO_BOX_UNREGISTERED_EVENT, JSON.stringify({ boxId }));

            await updatePOBox(updatedBox);
            return h.response({ message: `Successfully freed PO box with id=<${boxId}>`}).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
