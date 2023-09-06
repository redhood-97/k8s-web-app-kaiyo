import express from "express";
import { getInstanceInfo, ping } from "../controllers/instance";

export default (router: express.Router) => {
    router.get("/instance", getInstanceInfo);
    router.get("/ping", ping);
};
