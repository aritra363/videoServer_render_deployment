/* 
  Title : User Schema 
  Description : Defines the User's Schema 
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

//defining Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  password: {
    type: String,
    require: true,
  },
});

//exporting user's schema
module.exports = userSchema;
