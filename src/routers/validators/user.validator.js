const { body, param, query } = require('express-validator');
module.exports = {
    availableBikers:[
        query("branchId")
        .optional()
        .isUUID().withMessage("users.25")
    ],
    updateState:[
        param("userId")
        .isString().withMessage("users.val22")
        .notEmpty().withMessage("users.val23"),
        param("type")
        .isIn(["WILDCARD", "AVAILABLE", "PERMANENT"]).withMessage("users.val24"),
        query("branchId")
        .optional()
        .isUUID().withMessage("users.val25")
        .custom((val,{req})=>{
            if(req.params.type != "PERMANENT")
            {
                throw new Error("users.val29")
            }
            return true;
        }),
    ],
    geAll:[
        query("limit")
        .optional()
        .isInt().withMessage("users.val19"),
        query("skip")
        .optional()
        .isInt().withMessage("users.val20"),
        query("status")
        .isIn(["NEW", "QUEUE", "CHECKING", "UNABLE", "ACTIVE", "INACTIVE"]).withMessage("users.val21")
    ],
    getUser:[
        param("userId")
        .isMongoId().withMessage("users.val1")
    ],
    updateUser: 
        [
        param("userId")
        .isMongoId().withMessage("users.val1"),
        body("firstName")
        .optional()
        .isString().withMessage("users.val2")
        .notEmpty().withMessage("users.val3")
        .customSanitizer((value)=>{
            return value.toUpperCase();
          }),
        body("lastName")
        .optional()
        .isString().withMessage("users.val4")
        .notEmpty().withMessage("users.val5")
        .customSanitizer((value)=>{
            return value.toUpperCase();
          }),
        body("phone")
        .optional()
        .isNumeric().withMessage("users.val28"),
        body("transportId")
        .optional()
        .isString().withMessage("users.val2")
        .notEmpty().withMessage("users.val3"),
        body("status")
        .isIn(["NEW", "QUEUE", "CHECKING", "UNABLE", "ACTIVE", "INACTIVE"]).withMessage("users.val21")
    ]
}
