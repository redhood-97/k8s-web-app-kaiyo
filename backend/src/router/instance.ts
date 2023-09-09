import express from "express";
import { getInstanceInfo, ping, health } from "@src/controllers/instance";


export default (router: express.Router) => {
    router.get("/instance", getInstanceInfo);
    router.get("/ping", ping);
    router.get("/", health);
};
