import express from 'express';
import authentication from './authetication';
import users from './users';
import instance from './instance';
import task from './task';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    instance(router);
    task(router);

    return router;
};
