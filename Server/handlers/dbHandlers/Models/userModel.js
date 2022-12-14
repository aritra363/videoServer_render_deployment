/* 
  Title : User Model
  Description : Defines the User's Model
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

//Schema Dependencies
const userSchema = require ("../Schema/userSchema")

//defining Model
const userModel = mongoose.model('User',userSchema)

//exporting user's Model
module.exports = userModel;
