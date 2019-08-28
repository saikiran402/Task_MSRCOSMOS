const User = require("../models/user-model");


// all middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.session.redirectTo = req.originalUrl;
        req.flash("error", "You need to be logged in first"); // add a one-time message before redirect
        res.redirect("/");
    }
};


module.exports = middlewareObj;



// Create seperate middleware for vendor login and authentication 