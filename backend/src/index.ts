import express from "express";
import startup from "./startup";

const app = express();
startup(app);

export default app;
