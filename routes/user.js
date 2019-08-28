var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user-model");
var  middleware = require("../middleware");

//root route
// router.get("/:id/update", function(req, res){
//     res.render("update");
// });






router.post("/:id/update", middleware.isLoggedIn, function (req, res) {

    User.find({}, (function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
           User.findById(req.params.id, function (err, foundItem) {
               
            res.render("update", {
                list: foundUser,lists: foundItem
            });
              });
        }
    }));
    
});



router.post("/:id/edit", middleware.isLoggedIn, function (req, res) {
    var newItem = { firstname: req.body.fname, mname: req.body.mname, lname: req.body.lname, mobile: req.body.mobile, email: req.body.email, username: req.body.email}
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





module.exports = router;