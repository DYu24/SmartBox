import { addTrip } from '../database/firestore';
import Solace from '../pubsub/solace';
import Joi from '@hapi/joi';

const schema = Joi.object().keys({
    userId: Joi.string(),
    orders: Joi.array().items(Joi.object().keys({
        id: Joi.string(),
        to: Joi.string(),
        from: Joi.string(),
        phoneNumber: Joi.string(),
        address: Joi.string(),
        status: Joi.string(),
    })),
});

export default {
    method: 'POST',
    path: '/api/trips',
    handler: async (request, h) => {
        const { userId, orders } = await schema.validateAsync(request.payload);

        try {
            // For every order, publish a message
            // const pubsub = Solace.getSession();
            // for (const order in orders) {
                
            // }

            const id = await addTrip({ userId, orders });

            return h.response({ id }).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}