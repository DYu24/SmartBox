import { addCustomerOrder } from '../database/firestore';
import Joi from '@hapi/joi';

const schema = Joi.object().keys({
    to: Joi.string(),
    from: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
});


export default {
    method: 'POST',
    path: '/api/orders',
    handler: async (request, h) => {
        const newOrder = await schema.validateAsync(request.payload);
        try {
            const id = await addCustomerOrder({ ...newOrder, status: 'Awaiting Delivery' });
            return h.response({ id }).code(201);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}