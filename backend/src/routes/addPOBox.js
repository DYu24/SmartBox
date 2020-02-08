import { addPOBox } from '../database/firestore';
import Joi from '@hapi/joi';
import geohash from 'ngeohash';

const schema = Joi.object().keys({
    longitude: Joi.string(),
    latitude: Joi.string(),
    address: Joi.string(),
})

export default {
    method: 'POST',
    path: '/api/boxes',
    handler: async (request, h) => {
        const { longitude, latitude, address } = await schema.validateAsync(request.payload);
        const hash = geohash.encode(latitude, longitude);

        try {
            const id = await addPOBox({ longitude, latitude, address, hash, reserved: false });
            return h.response({ id }).code(201);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
