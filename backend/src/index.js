import 'core-js';
import "regenerator-runtime/runtime";

import dotenv from 'dotenv';
import { Server } from '@hapi/hapi';

import routes from './routes';
import Solace from './pubsub/solace';
import solace from 'solclientjs';

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
    Solace.initializeConnection(() => { 
        server.start();
    });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
