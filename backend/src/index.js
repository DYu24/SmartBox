import 'core-js';

import dotenv from 'dotenv';
import { Server } from '@hapi/hapi';

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

const init = async () => {
    server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
