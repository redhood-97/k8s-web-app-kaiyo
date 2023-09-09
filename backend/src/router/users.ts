import express from "express";
import { retrieveUsers } from "@src/controllers/users";
import { isAuthenticated } from "@src/middlewares";

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, retrieveUsers);
};
