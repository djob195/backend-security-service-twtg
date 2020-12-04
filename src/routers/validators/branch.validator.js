const { body, param } = require('express-validator');
module.exports = {
    loginValidator:[
        body("email")
        .notEmpty().withMessage("branch.val1")
        .isString().withMessage('branch.val2'),
        body("password")
        .notEmpty().withMessage("branch.val3")
        .isString().withMessage('branch.val4')
    ]
}