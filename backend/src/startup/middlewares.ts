import express, { Express } from "express";
import cors from "cors";
import logger from "../utils/logger";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "../router";
const middlewares = async (app: Express) => {
    try {
        // logger.info("")
        await Promise.all([
            app.use(express.json({ limit: "10mb" })),
            app.use(express.urlencoded({ extended: false, limit: "10mb" })),
            app.use(cors({ credentials: true })),

            app.use(compression()),
            app.use(cookieParser()),
            app.use(bodyParser.json()),
            app.use("/", router()),
        ]);
        logger.info("Middlewares connected");
    } catch (error) {
        logger.error(`Error in connecting middlewares ${error}`);
    }
};

export default middlewares;
