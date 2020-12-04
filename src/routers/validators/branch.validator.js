const { body, param } = require('express-validator');
module.exports = {
    loginValidator:[
        body("uuid")
        .notEmpty().withMessage("branch.val1")
        .isString().withMessage('branch.val2')
    ]
}