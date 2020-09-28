const { Router } = require('express');
const { AuthenticationValidator } = require("./validators");
const authenticationValidator = require('./validators/authentication.validator');

module.exports = function ({ AuthenticationController, ValidationMiddleware, JwtMiddleware}) {
    const router = Router();

    router.post('/login',
    AuthenticationValidator.postLogin,
    ValidationMiddleware.checkValidations,
    AuthenticationController.login.bind(AuthenticationController));

    router.get("/check",
    JwtMiddleware.isAuthorized,
    (req,res,next)=>{  return res.status(200).json({message: "its live"});})

    return router;
};