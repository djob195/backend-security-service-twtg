const { Router } = require('express');
const { ControllerValidator } = require("./validators");

module.exports = function ({ ControllerController, ValidationMiddleware}) {
    const router = Router();

    router.get("/:id",
    ControllerValidator.getValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.get.bind(ControllerController));

    router.post("/",
    ControllerValidator.createValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.create.bind(ControllerController));

    router.get("/",
    ControllerValidator.getAllValidator,
    ControllerController.getAll.bind(ControllerController))

    router.patch("/",
    ControllerValidator.patchValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.patch.bind(ControllerController));

    router.post('/login',
    ControllerValidator.loginValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.login.bind(ControllerController));

    router.post('/update-password',
    ControllerValidator.updatePasswordValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.updatePassword.bind(ControllerController));

    router.post('/forgot-password',
    ControllerValidator.forgotPasswordValidator,
    ValidationMiddleware.checkValidations,
    ControllerController.forgotPassword.bind(ControllerController));

    return router;
};