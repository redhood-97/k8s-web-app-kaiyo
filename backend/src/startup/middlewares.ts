import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "router";

import logger from "@src/utils/logger";
import { ApplicationError } from "@src/utils/Errors";

const errorHandler = (error: ApplicationError, request: Request, response: Response, next: NextFunction) => {
    // Error handling middleware functionality
    console.log( `error ${error.message}`) // log the error

    if (process.env.ENV === "production") {
        logger.error(error.message);
        response.status(error.statusCode).send({ 
            success: false, 
            error: { 
                message: error.message,
                statusCode: error.statusCode,
                name: error.name
            }
        });
    } else {
        // send back an easily understandable error message to the caller
        response.status(error.statusCode).send({
            success: false, 
            error: { 
                message: error.message,
                statusCode: error.statusCode,
                name: error.name,
                stack: error.stack,
            }
        });
    }
    next();
  }

const middlewares = async (app: Express) => {
    try {
        logger.info("Middlewares connected");
        await Promise.all([
            app.use(express.json({ limit: "10mb" })),
            app.use(express.urlencoded({ extended: false, limit: "10mb" })),
            app.use(cors({ credentials: true })),
            
            app.use(compression()),
            app.use(cookieParser()),
            app.use(bodyParser.json()),
            app.use("/", router()),
            app.use(errorHandler),

        ]);
        logger.info("Middlewares finished");
    } catch (error) {
        logger.error(`Error in connecting middlewares ${error}`);
    }
};

export default middlewares;
