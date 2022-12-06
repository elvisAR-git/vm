import express from 'express';
/**
 * Express configuration
 */
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import errorHandler from "errorhandler"
import swaggerUi from "swagger-ui-express";

import { swaggerDocument } from "../../docs/swagger";

export function expressAddon(app: express.Application) {

    let env = app.get("env");

    app.use(compression());
    app.use(
        bodyParser.urlencoded({
            extended: false,
            limit: "100mb",
            parameterLimit: 50000,
        })
    );
    app.use(bodyParser.json({ inflate: true, limit: "100mb" }));
    app.use(methodOverride());

    if ("development" === env) {
        app.use(morgan("dev"));
        app.use(errorHandler());
    }

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
