import express from 'express';
import appControllers from './app/api/controllers';
import environment from './app/config/environment';
import Machine from './app/modules/machine';

// Main application Routes
const PREFIX = `/api/${environment.apiVersion}`;


export default function appRoutes(app: express.Application, vm: Machine) {
    app.use(`${PREFIX}/admin`, appControllers(vm).admin);
    app.use(`${PREFIX}/user`, appControllers(vm).user);

    // catch 404 and forward to error handler
    app.use((req, res,) => {

        // basic 404 error
        res.status(404).send(
            `
            <html>
                <head>
                    <title>404</title>
                </head>
                <body>
                    <h1>404</h1>
                    <p>Page not found</p>
                    <br>
                    The requested resource <b>${req.originalUrl}</b> was not found on this server.
                </body>
            </html>
            `
        )
    });
}