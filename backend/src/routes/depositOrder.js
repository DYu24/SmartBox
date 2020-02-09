import messagingClient from '../pubsub/Messaging';
import { updateOrder } from '../database/firestore';

export default {
    method: 'POST',
    path: '/api/deposit/{boxId}',
    handler: async (request, h) => {
        try {
            // Update order status to delivered
            const box = await getPOBox(id);
            let { order } = box;
            order.status = 'DELIVERED';
            await updateOrder(order);
    
            // Publish delivery event for corresponding box to close
            messagingClient.publish('packageDeliveredEvent', { boxId });
            
            return h.response({ message: `Order with id=<${order.id}> was successfully delivered` }).code(200);
        } catch(error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
