const { Router } = require('express');
const { AuthenticationValidator } = require("./validators");

module.exports = function ({ AuthenticationController, ValidationMiddleware, JwtMiddleware}) {
    const router = Router();

    //deleteBikers
    
    router.get('/reset/:uid',
    AuthenticationController.deleteBikers.bind(AuthenticationController));
    
    router.post('/refresh-token',
    JwtMiddleware.isAuthorized,
    AuthenticationController.refresh.bind(AuthenticationController));

    router.post('/login',
    AuthenticationValidator.postLogin,
    ValidationMiddleware.checkValidations,
    AuthenticationController.login.bind(AuthenticationController));

    router.post('/new',
    AuthenticationValidator.create,
    ValidationMiddleware.checkValidations,
    AuthenticationController.post.bind(AuthenticationController));

    return router;
};
