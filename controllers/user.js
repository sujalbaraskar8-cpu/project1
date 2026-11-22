const User = require("../models/user.js");

module.exports.signup = async(req,res) => {
    try{
        let {username,email,password} = req.body;
    let newUser = new User({email,username});
    let reguser = await User.register(newUser,password);
    req.login(reguser,(err)=>{
        if(err){return next(err);}
        req.flash("success","welcome to wanderlust!");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    };   
};
module.exports.loginForm = (req,res) => {
    res.render("users/login.ejs")
};
module.exports.logout = async(req,res,next) =>{
    req.logout((err) =>{
        if(err){
             return next(err);
        };
        req.flash("success","you are loged out ");
        res.redirect("/listings");
    });   
};