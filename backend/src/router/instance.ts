import express from "express";

import { getInstanceInfo } from "../controllers/instance";

export default (router: express.Router) => {
    router.get("/instance", getInstanceInfo);
};
