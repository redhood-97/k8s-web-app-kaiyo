import startDatabase from "./startDatabase";
import setupEnvVars from "./setupEnvVars";
import middlewares from "./middlewares";
import { Express } from "express";
import logger from "../utils/logger";

export default async (app: Express) => {
    try {
        logger.info("app is starting");
        setupEnvVars();
        middlewares(app);
        startDatabase();
    } catch (error) {
        logger.error(`Failed to start app ${error}`);
    }
};
