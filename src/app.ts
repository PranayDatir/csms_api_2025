import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './Router/user.router';
import ticketRouter from './Router/ticket.router';
import roleRouter from './Router/role.router';
import chatRouter from './Router/chatHistory.router';
import { Routes } from './Shared/Constants/Route';
import Logging from './library/Logging';
import config from './db/config/config';

dotenv.config();

const app: Application = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(`${Routes.API}${Routes.AUTH}`, userRouter);
app.use(Routes.API, ticketRouter);
app.use(Routes.API, roleRouter);
app.use(Routes.API, chatRouter);

// Connect to MongoDB
mongoose.connect(config.mongo.url
)
    .then(() => {
        Logging.info('Mongo connected successfully.');
        startServer();
    })
    .catch((error) => Logging.error(error));

const startServer = () => {
    app.use((req, res, next) => {
        if (req.method !== 'OPTIONS') {
            const inAt = new Date().toLocaleTimeString();
            const inUrl = req.url;
            const ip = req.headers['x-forwarded-for'] ?? req.headers.host;

            res.on('finish', () => {
                switch (res.statusCode) {
                    case 201:
                    case 200:
                        Logging.info(`[IN ${inAt}] [OUT ${new Date().toLocaleTimeString()}] [${req.method}] [${res.statusCode}] - IP: [${ip}] - [${inUrl}]`);
                        break;
                    default:
                        Logging.error(`[IN ${inAt}] [OUT ${new Date().toLocaleTimeString()}] [${req.method}] [${res.statusCode}] - IP: [${ip}] - [${inUrl}]`);
                        break;
                }
            });
        }
        next();
    });

    app.listen(port, () => Logging.info(`Server is running on port ${port}`));
};
