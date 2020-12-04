const { Router } = require('express');
const { BranchValidator } = require("./validators");

module.exports = function ({ BranchController, ValidationMiddleware}) {
    const router = Router();

    router.post('/login',
    BranchValidator.loginValidator,
    ValidationMiddleware.checkValidations,
    BranchController.loginBranch.bind(BranchController));

    return router;
};