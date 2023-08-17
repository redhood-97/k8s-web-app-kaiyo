import express from "express";

import { retrieve, remove, create, update, modifyStatus } from "../controllers/task";

export default (router: express.Router) => {
    router.get("/tasks", retrieve);
    router.post("/tasks", create);
    router.put("/tasks/{id}", update);
    router.patch("/tasks/{id}", modifyStatus);
    router.delete("/tasks/{id}", remove);
};
