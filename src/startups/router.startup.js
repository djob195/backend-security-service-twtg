const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

module.exports = function router({HealtCheckMiddleware, InternationalizationMiddleware}) {
    const router = express.Router();
    
    router.use(express.json())
    .use(cors())
    .use(helmet())
    .use(InternationalizationMiddleware.attachI18.bind(InternationalizationMiddleware));

    router.use('/api/healthcheck', HealtCheckMiddleware.getStatus.bind(HealtCheckMiddleware));

    return router;
}