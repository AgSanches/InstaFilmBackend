const { validationResult } = require('express-validator');

const checkErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        const fieldsErrors = [];


        errors.array().forEach(error => {
            fieldsErrors.push(error.param);
        })

        return res.status(400).json({
            message: "Los siguientes campos no son válidos",
            errors: fieldsErrors
        });
    }
    next();
}

module.exports = checkErrors;
