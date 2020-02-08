import { addTrip, findNearbyBox, updatePOBox } from '../database/firestore';
import Solace from '../pubsub/solace';
import Joi from '@hapi/joi';
import NodeGeocoder from 'node-geocoder';
import geohash from 'ngeohash';

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

const geocoder = NodeGeocoder({ provider: 'openstreetmap' }); 

const getGeohashRange = (
    latitude,
    longitude,
    distance, // miles
  ) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile
  
    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;
  
    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;
  
    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);
  
    return {
      lower,
      upper
    };
  };

const reservePOBox = async (order) => {
    order.status = 'Out for delivery';
    const { latitude, longitude } = await geocoder.geocode(order.address);
    const range = getGeohashRange(latitude, longitude, 5);
    const box = await findNearbyBox(range);
    const updatedBox = { ...box, reserved: true, order };
    await updatePOBox(updatedBox);
    return updatedBox;
}

export default {
    method: 'POST',
    path: '/api/trips',
    handler: async (request, h) => {
        const { userId, orders } = await schema.validateAsync(request.payload);

        try {
            // For every order, publish a message
            let failed = [];
            let succesful = [];
            let poBoxes = [];
            for (const order of orders) {
                try {
                    const box = await reservePOBox(order);

                    const pubsub = Solace.getSession();
                    const message = Solace.createMessage('Delivering', order.phoneNumber);
                    pubsub.send(message);

                    poBoxes = [...poBoxes, box];
                    succesful = [...succesful, order];
                } catch (error) {
                    console.log(error);
                    failed = [...failed, order];
                }
            }

            const id = await addTrip({ userId, succesful });

            return h.response({ id, failed, poBoxes }).code(200);
        } catch (error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}