import * as path from "path";
import dotEnv from "dotenv";
import basePath from "../../getBasePath";
import logger from "../utils/logger";

const appEnv = process.env.ENV || "";

export default () => {
    dotEnv.config({
        path: path.join(basePath, `${appEnv}.env`),
    });
    logger.info("Configuration file loaded");
};
