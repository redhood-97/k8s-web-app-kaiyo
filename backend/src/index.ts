import express from 'express';
import rTracer from 'cls-rtracer';

import startup from './startup';

const app = express();
app.use(rTracer.expressMiddleware())
startup(app);
export default app;
