/* 
  Title : Signup Validator 
  Description : Handles Singup data validation 
  Author : Aritra Pal
  Date : 21/12/2022 
*/

//dependencies
const { check, validationResult } = require("express-validator");
const userModel = require("../../handlers/dbHandlers/Models/userModel");

//Validation middleware
const ValidationMiddlewares = [
  check("firstName")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Only Alphabets")
    .isLength({ min: 3, max: 15 })
    .withMessage("FirstName allows max 15 and min 3 Characters")
    .trim(),
  check("lastName")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Only Alphabets")
    .isLength({ min: 3, max: 15 })
    .withMessage("LastName allows max 15 and min 3 Characters")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email address")
    .custom(async (value) => {
      //check if the email exists
      try {
        const result = await userModel.findOne({ email: value });
        console.log(result);
        if (result) {
          throw new Error("Email already Exists");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    })
    .trim(),
  check("password")
    .isStrongPassword()
    .isLength({ max: 20 })
    .withMessage(
      "Password must be > 8 and less than 20 Charaters and include 1 Uppercase, 1lowercase ,1 Number and 1 Symbol"
    )
    .trim(),
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
