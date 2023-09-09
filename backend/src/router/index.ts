import express from "express";
import authentication from "@src/router/authetication";
import users from "@src/router/users";
import instance from "@src/router/instance";
import task from "@src/router/task";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    instance(router);
    task(router);

    return router;
};
