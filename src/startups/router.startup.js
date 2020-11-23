const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const internationalization = require("../internationalization");

module.exports = function router({HealthcheckMiddleware, InternationalizationMiddleware,
     AuthenticationRouter, ErrorMiddleware, UserRouter}) {
    const router = express.Router();
    
    router.use(express.json())
    .use(cors())
    .use(helmet())
    .use(InternationalizationMiddleware.attachI18(internationalization))
    router.use('/healthcheck', HealthcheckMiddleware.getStatus.bind(HealthcheckMiddleware));
    router.use('/authentication', AuthenticationRouter);
    router.use('/users', UserRouter);

    router.use(ErrorMiddleware.checkErrors.bind(ErrorMiddleware));

    return router;
}
