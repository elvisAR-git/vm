// /**
//  * Main application file
//  */

import Machine from "./app/modules/machine";
import Register from "./app/modules/machine/register/register";

"use strict";

import dotenv from 'dotenv';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

process.env.TZ = "Africa/Nairobi";

dotenv.config();

import express from "express";
import config from "./app/config/environment";
import cors from "cors";
import { expressAddon } from './app/config/express';
import appRoutes from './routes';

const vm = new Machine(1, 'Pariti Vending Machine');
const app = express();

app.use(cors());
expressAddon(app);

app.get("/", (req, res) => {
    res.send(`
    <h1>Pariti Vending Machine App</h1>
    <p>Version: ${config.apiVersion}</p>

     `)
});


appRoutes(app, vm);

app.listen(config.port, config.ip, () => {
    console.info(
        `Express server listening on ${config.port} and ip ${config.ip
        }, in ${app.get("env")} mode follow http://localhost:${config.port}/`
    );
});

process.on("uncaughtException", (err) => {
    console.error(`Caught exception: ${err}`);
});

process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", reason);
});


