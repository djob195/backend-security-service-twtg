const { Router } = require('express');
const { UserValidator } = require("./validators");

module.exports = function ({ UserController, ValidationMiddleware}) {
    const router = Router();
    router.get("/available",
    UserValidator.availableBikers,
    ValidationMiddleware.checkValidations,
    UserController.getAvailableBikers.bind(UserController)
    );

    router.patch("/uid/:userId/type/:type",
    UserValidator.updateState,
    ValidationMiddleware.checkValidations,
    UserController.updateState.bind(UserController)
    );
    
    router.patch('/:userId/uid/:uid',
    UserValidator.updateUser,
    ValidationMiddleware.checkValidations,
    UserController.patch.bind(UserController));

    router.get('/:userId',
    UserValidator.getUser,
    ValidationMiddleware.checkValidations,
    UserController.get.bind(UserController));

    router.get('/',
    UserValidator.geAll,
    ValidationMiddleware.checkValidations,
    UserController.getAll.bind(UserController));
    
    return router;
};