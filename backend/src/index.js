import 'core-js';
import "regenerator-runtime/runtime";

import dotenv from 'dotenv';
import { Server } from '@hapi/hapi';

import routes from './routes';
import messagingClient from './pubsub/Messaging';

dotenv.config();

const server = new Server({
    port: process.env.PORT || '5000',
    host: process.env.HOST || 'localhost',
    routes: {
        cors: true,
    },
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'smart-box';
    }
});

server.route(routes);

const init = async () => {
    try {
        await messagingClient.connectWithPromise();
        server.start();
        console.log('server running')
    } catch(error) {
        console.log(error);
    }
}

init()

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
