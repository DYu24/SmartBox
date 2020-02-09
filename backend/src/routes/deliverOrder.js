import messagingClient from '../pubsub/Messaging';
import { updateOrder, getPOBox } from '../database/firestore';
import { PACKAGE_DELIVERED_EVENT } from '../pubsub/events';

export default {
    method: 'POST',
    path: '/api/deliver/{boxId}',
    handler: async (request, h) => {
        try {
            // Update order status to delivered
            const { boxId } = request.params; 
            const box = await getPOBox(boxId);
            let { order } = box;
            order.status = 'DELIVERED';
            await updateOrder(order);
    
            // Publish delivery event for corresponding box to close
            messagingClient.publish(PACKAGE_DELIVERED_EVENT, JSON.stringify({ boxId }));

            return h.response({ message: `Order with id=<${order.id}> was successfully delivered` }).code(200);
        } catch(error) {
            console.log(error);
            return h.response({ message: error.message }).code(500);
        }
    }
}
