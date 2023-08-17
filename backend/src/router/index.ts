import express from "express";
import authentication from "./authetication";
import users from "./users";
import instance from "./instance";
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    instance(router);

    return router;
};
