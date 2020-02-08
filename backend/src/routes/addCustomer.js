import Joi from '@hapi/joi';
import { addCustomer } from '../database/firestore';

const schema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
});

export default {
    method: 'POST',
    path: '/api/customers',
    handler: async (request, h) => {
        const newCustomer = await schema.validateAsync(request.payload);
        try {
            const id = await addCustomer(newCustomer);
            return h.response({ id }).code(201);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}