import { Express } from 'express';

import setupEnvVars from './setupEnvVars';
import middlewares from './middlewares';
import logger from '../utils/logger';

export default async (app: Express) => {
    try {
        logger.info('app is starting');
        setupEnvVars();
        middlewares(app);
        logger.info('app finished the middleware');
    } catch (error) {
        logger.error(`Failed to start app ${error}`);
    }
};
