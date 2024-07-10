import express from 'express';
import pkg from 'body-parser';
import { PrismaClient } from '@prisma/client';
import routes from './routes.js';

const app = express();
const prisma = new PrismaClient();

const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', routes);

export default app;