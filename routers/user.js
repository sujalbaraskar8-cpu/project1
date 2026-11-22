const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

router.route("/signup")
    .get((req,res,next)=>{res.render("users/signup.ejs");})
    .post(wrapAsync(usercontroller.signup));

router.route("/login")
    .get(usercontroller.loginForm)
    .post(saveRedirectUrl, passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}), (req,res) =>{
    req.flash("success","welcome back ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);;
});

router.get("/logout",usercontroller.logout);

module.exports=router;

