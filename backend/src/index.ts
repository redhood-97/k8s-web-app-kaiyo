import express from 'express';
import startup from '@src/startup';

const app = express();
startup(app);
export default app;
