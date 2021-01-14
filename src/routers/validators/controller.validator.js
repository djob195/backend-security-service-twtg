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
        param("id")
        .isMongoId().withMessage(""),
        body("uid")
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
        .isIn(['ADMIN', 'CUSTOMER_SERVICE']).withMessage("")
    ],
    createValidator: [
        body("uid")
        .notEmpty().withMessage("")
        .isString().withMessage(""),
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
        .isIn(['ADMIN', 'CUSTOMER_SERVICE']).withMessage("")
    ],
    loginValidator: [
        body("uuid")
        .notEmpty().withMessage("branch.val1")
        .isString().withMessage('branch.val2')
    ]
}