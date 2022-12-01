// /**
//  * Main application file
//  */

import Register from "./app/modules/machine/register";

// "use strict";

// import dotenv from 'dotenv';

// // Set default node environment to development
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

// process.env.TZ = "Africa/Nairobi";

// dotenv.config();

// import express from "express";
// import config from "./app/config/environment";
// import cors from "cors";
// import { expressAddon } from './app/config/express';
// import appRoutes from './routes';

// const app = express();

// app.use(cors());
// expressAddon(app);
// const PORT = config.port;

// app.get("/", (req, res) => {
//     res.send(`
//     <h1>Pariti Vending Machine App</h1>
//     <p>Version: ${config.apiVersion}</p>

//      `)
// });


// appRoutes(app);

// app.listen(config.port, config.ip, () => {
//     console.info(
//         `Express server listening on ${config.port} and ip ${config.ip
//         }, in ${app.get("env")} mode follow http://localhost:${config.port}/`
//     );
// });

// process.on("uncaughtException", (err) => {
//     console.error(`Caught exception: ${err}`);
// });

// process.on("unhandledRejection", (reason, p) => {
//     console.error("Unhandled Rejection at:", p, "reason:", reason);
// });


const reg = new Register({
    name: 'default_US',
    bills: [
        {
            value: 100,
            count: 10,
            description: 'One Hundred Dollar Bill'
        },
        {
            value: 50,
            count: 10,
            description: 'Fifty Dollar Bill'
        },
        {
            value: 20,
            count: 10,
            description: 'Twenty Dollar Bill'
        }, {
            value: 10,
            count: 10,
            description: 'Ten Dollar Bill'
        },
        {
            value: 5,
            count: 10,
            description: 'Five Dollar Bill'
        }, {
            value: 1,
            count: 10,
            description: 'One Dollar Bill'
        }],
    coins: [
        {
            value: 0.5,
            count: 10,
            description: 'Half Dollar Coin'
        },
        {
            value: 0.25,
            count: 10,
            description: 'Quarter'
        }, {
            value: 0.10,
            count: 10,
            description: 'Dime'
        }, {
            value: 0.05,
            count: 10,
            description: 'Nickel'
        }, {
            value: 0.01,
            count: 10,
            description: 'Penny'
        },
    ]
})


console.log(reg.checkout([
    {
        value: 100,
        count: 1,
    }
], [
    {
        value: 0.25,
        count: 1,
    }
], 20.25));