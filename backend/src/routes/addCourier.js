import { addCourier } from '../database/firestore';
import Joi from '@hapi/joi';

const schema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
});

export default {
    method: 'POST',
    path: '/api/couriers',
    handler: async (request, h) => {
        const newCourier = await schema.validateAsync(request.payload);
        
        try {
            const id = await addCourier(newCourier);
            return h.response({ id }).code(201);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
