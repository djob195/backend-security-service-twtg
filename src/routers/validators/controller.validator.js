const { body, param, query } = require('express-validator');
module.exports = {
    getValidator:[
        param("id")
        .isMongoId().withMessage("")
    ],
    getAllValidator:[
        query("limit")
        .isInt().withMessage(""),
        query("skip")
        .isInt().withMessage("")
    ],
    patchValidator: [   
        body("mongoId")
        .isMongoId().withMessage(""),
        body("uid")
        .notEmpty().withMessage("")
        .isString().withMessage(""),
        body("firstName")
        .optional()
        .notEmpty().withMessage("")
        .isString().withMessage(""),
        body("lastName")
        .optional()
        .notEmpty().withMessage("")
        .isString().withMessage(""),
        body("companyId")
        .optional()
        .isUUID().withMessage(""),
        body("branchOfficeId")
        .optional()
        .isUUID().withMessage(""),
        body("active")
        .optional()
        .isBoolean().withMessage(""),
        body("role")
        .optional()
        .isIn(['ADMINISTRATOR', 'CONTROLLER', 'USER']).withMessage("")
    ],
    createValidator: [
        body("firstName")
        .notEmpty().withMessage("")
        .isString().withMessage(""),
        body("lastName")
        .notEmpty().withMessage("")
        .isString().withMessage(""),
        body("companyId")
        .optional()
        .isUUID().withMessage(""),
        body("branchOfficeId")
        .optional()
        .isUUID().withMessage(""),
        body("role")
        .isIn(['ADMINISTRATOR', 'CONTROLLER', 'USER']).withMessage(""),
        body("email")
        .isEmail().withMessage("")
    ],
    loginValidator: [
        body("uuid")
        .notEmpty().withMessage("branch.val1")
        .isString().withMessage('branch.val2')
    ],
    updatePasswordValidator:[
        body("uid")
        .notEmpty().withMessage("branch.val1")
        .isString().withMessage('branch.val2'),
        body("password")
        .notEmpty().withMessage("")
        .isString().withMessage(''),
    ],
    forgotPasswordValidator:[
        body("email")
        .isEmail().withMessage("")
    ],
}