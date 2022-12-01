import express from 'express';
import appControllers from './app/api/controllers';
import environment from './app/config/environment';
import Machine from './app/modules/machine';

// Main application Routes
const PREFIX = `/api/${environment.apiVersion}`;


export default function appRoutes(app: express.Application, vm: Machine) {
    app.use(`${PREFIX}/admin`, appControllers(vm).admin);
}