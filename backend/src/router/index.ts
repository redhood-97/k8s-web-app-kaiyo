import express from "express";
import authentication from "./authetication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);

    return router;
};
