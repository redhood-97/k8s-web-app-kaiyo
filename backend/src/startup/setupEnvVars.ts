import * as path from 'path';
import dotEnv from 'dotenv';

import logger from '../utils/logger';

const appEnv = process.env.ENV || '';

export default () => {
    if (appEnv === 'production') {
        logger.info('production env loaded from secrets');
        return;
    }
    const envPath = path.resolve(__dirname, `../${appEnv}.env`);
    logger.info('Loading configuration file', envPath);

    dotEnv.config({
        path: envPath,
    });
    logger.info('Configuration file loaded');
};
