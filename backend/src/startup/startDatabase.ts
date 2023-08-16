import mongoose from "mongoose";
import logger from "../utils/logger";

const connect = async () => {
    const connectionString =
        process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
    const dbName = "k8s-web-app";

    try {
        await mongoose.connect(connectionString, {
            dbName,
            autoIndex: true,
            connectTimeoutMS: 100000,
        });
        logger.info("Connected to database");
    } catch (error) {
        logger.error(`Failed to connect ${error}`);
    }
};

export default connect;
