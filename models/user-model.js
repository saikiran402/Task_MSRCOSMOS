var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    fname:String,
    mname:String,
    lname:String,
    email:String,
    mobile:String,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);