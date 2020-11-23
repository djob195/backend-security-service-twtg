const { body, param } = require('express-validator');
module.exports = {
    create:[
        body("idToken")
        .notEmpty().withMessage("authentication.val1")
        .isString().withMessage('authentication.val2'),
        param("pushToken")
        .optional()
        .notEmpty().withMessage("authentication.val5")
        .isString().withMessage('authentication.val6')
    ],
    postLogin: [
        body("idToken")
        .notEmpty().withMessage("authentication.val1")
        .isString().withMessage('authentication.val2'),
        param("pushToken")
        .optional()
        .notEmpty().withMessage("authentication.val5")
        .isString().withMessage('authentication.val6')
    ],
    validateNewUser:[
        body("uid")
        .notEmpty().withMessage("authentication.val3")
        .isString().withMessage('authentication.val4'),
    ]
}