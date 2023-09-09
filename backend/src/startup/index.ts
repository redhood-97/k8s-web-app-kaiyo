import { Express } from 'express';

import setupEnvVars from '@src/startup/setupEnvVars';
import middlewares from '@src/startup/middlewares';
import logger from '@src/utils/logger';

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
