const { body } = require('express-validator');
module.exports = {
    postLogin: [
        body("idToken")
        .notEmpty().withMessage("val8")
        .isString().withMessage('val9')
    ],
    validateNewUser:[
        body("uid")
        .notEmpty().withMessage("val25")
        .isString().withMessage('val26'),
    ]
}