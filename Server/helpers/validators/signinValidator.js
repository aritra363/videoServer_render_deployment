/* 
  Title : Signin Validator 
  Description : Handles Singin data validation 
  Author : Aritra Pal
  Date : 21/12/2022 
*/

//dependencies
const { check, validationResult } = require("express-validator");
const userModel = require("../../handlers/dbHandlers/Models/userModel");

//Validation middleware
const ValidationMiddlewares = [
  check("email").isLength({ min: 1 }).withMessage("Email cannot be blank"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password cannot be blank"),
];

//validation handler
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  //if error then send response else send to the next middleware
  if (Object.keys(mappedErrors).length > 0) {
    res.status(500).send({
      errors: mappedErrors,
    });
  } else {
    next();
  }
};

//exporting the validationmiddleware and validationhandler
module.exports = { ValidationMiddlewares, validationHandler };
