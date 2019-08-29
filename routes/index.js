var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user-model");
var  middleware = require("../middleware");


router.get("/", function(req, res){
    res.render("home-view");
});


router.get("/register", function(req, res){
   res.render("register-view", {page: 'register'}); 
});


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,email:req.body.username,mobile:req.body.phone,fname:req.body.fname,mname:req.body.mname,lname:req.body.lname});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register-view", {error: err.message});
        }
           req.flash("success", "Successfully Signed Up! Please login to continue");
           res.redirect("/"); 
    });
});


router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("user", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true,
    }), function(req, res){
   if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect('/');
        }
});




router.get("/dashboard", middleware.isLoggedIn, function (req, res) {
    User.find({}, (function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
           
            res.render("dashboard", {
                list: foundUser
            });
        }
    }));
});





router.post("/:id/delete", middleware.isLoggedIn, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/dashboard");
        } else {
             req.flash("error", "User deleted");
            res.redirect("/dashboard");
        }
    });
});


router.post("/:id/edit", middleware.isLoggedIn, function (req, res) {
    var newItem = { fname: req.body.fname, mname: req.body.mname, lname: req.body.lname, mobile: req.body.phone, email: req.body.email, username: req.body.email}
    User.findByIdAndUpdate(req.params.id, newItem, function (err, updatedItem) {
        if (err) {
            console.log(err);
            res.redirect("/dashboard");
        } else {
            //redirect somewhere(show page)
            res.redirect("/dashboard");
        }
    });
});






router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/");
});


module.exports = router;
