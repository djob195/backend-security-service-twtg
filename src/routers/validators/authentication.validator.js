const { body } = require('express-validator');
module.exports = {
    postLogin: [
        body("idToken")
        .notEmpty().withMessage("val8")
        .isString().withMessage('val9'),
    ]
}