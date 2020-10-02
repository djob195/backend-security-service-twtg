const { Router } = require('express');
const { AuthenticationValidator } = require("./validators");

module.exports = function ({ AuthenticationController, ValidationMiddleware}) {
    const router = Router();

    router.post('/login',
    AuthenticationValidator.postLogin,
    ValidationMiddleware.checkValidations,
    AuthenticationController.login.bind(AuthenticationController));

    router.post('/new',
    AuthenticationValidator.postLogin,
    ValidationMiddleware.checkValidations,
    AuthenticationController.post.bind(AuthenticationController));

    router.get('/:id',
    AuthenticationController.get.bind(AuthenticationController));

    return router;
};