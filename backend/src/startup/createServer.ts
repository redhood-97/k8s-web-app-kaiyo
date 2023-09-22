import http from 'http';
import { AddressInfo } from 'net';

import app from '../index';
import logger from '../utils/logger';

const port: string | number = process.env.SERVER_PORT || 8080;

app.set('port', port);

const server = http.createServer(app);

const onListening = () => {
    const addr = server.address() as AddressInfo;
    const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}...`);
};

const onError = (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated prevelage`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
