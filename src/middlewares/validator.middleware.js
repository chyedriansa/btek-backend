const { body, param, validationResult, query, matchedDat} = require('express-validator');

exports.createUser = [
    body('email').isEmail().withMessage('email is invalid'),
    body('password').isLength({min: 4}).withMessage("Password length must be 4 char or mode")
];

exports.paging = [
    (req, res, next) => {
        req.query.page = req.query.page || 1;
        req.query.limit = req.query.limit || 5;
        req.query.sortBy = req.query.sortBy || "createdAt";
        req.query.searchBy = req.query.searchBy || "email";
        req.query.search = req.query.search || "";
        req.query.reverse = req.query.reverse || "0";
        return next();
    },
    query("page").optional().toInt(10),
    query("limit").optional().toInt(10),
    query("reverse").optional().toBoolean(),
    query("searchBy").isIn(["email"]).withMessage("Data is not found"),
    query("search").optional().trim(),
    query("sortBy").isIn(["email", "createdAt", "updatedAt"]).withMessage("Data is not found")
];

exports.basicUserCreds = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isStrongPassword({minLength: 8}).withMessage("Password length must have 8 character or more")
      .isStrongPassword({minUppercase: 1}).withMessage("Password must heve uppercase 1 or more")
      .isStrongPassword({minLowercase: 1}).withMessage("Password must heve lowercase 1 or more")
      .isStrongPassword({minNumbers: 1}).withMessage("Password must ve number 1 or more")
      .isStrongPassword({minSymbols: 1}).withMessage("Password must have symbol 1 or more")
];

exports.paramsUUID = [
    param ("id").isUUID(4).withMessage("invalid ID"),
];

exports.check = (req, res, next) => {
    const errorValidation = validationResult(req);
    if(!errorValidation.isEmpty()){
        return res.status(400).json({
            success : false,
            message : "Validation error",
            results : errorValidation.array()
        });
    }
    return next();
}