const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = function router({HealthcheckMiddleware, InternationalizationMiddleware, AuthenticationRouter}) {
    const router = express.Router();
    
    router.use(express.json())
    .use(cors())
    .use(helmet())
    .use(InternationalizationMiddleware.attachI18.bind(InternationalizationMiddleware));
    router.use('/healthcheck', HealthcheckMiddleware.getStatus.bind(HealthcheckMiddleware));
    router.use('/authentication', AuthenticationRouter);

    return router;
}