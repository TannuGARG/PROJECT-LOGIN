const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// we have defined how r schema must look like
userSchema = new mongoose.Schema({
    name:  String,
    email: String ,
    password: String

})


//created a collection named User
const Registered= mongoose.model("Registered", userSchema);

module.exports = Registered;