const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    { user, blogPost } = require("./models.js"),
    { isLoggedIn, isSignin } = require("./middlewares.js");

const publicFolder = __dirname + "/public/";

// register user function
(()=>{
    console.log("hey")
})

// Dashboard route
router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile/index")
})


// login form
router.get("/etc_admin", (req, res) => {
    res.sendFile(publicFolder + "login-page.html")
})
// login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: `Welcome Back`
    }), (req, res) => {
    });
// **********************

// signup form
router.get("/signup", (req, res) => {
    res.render("usernew")
})
// signup logic
router.post("/signup", (req, res) => {
    const newUser = new User({ username: req.body.username });
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.matric = req.body.matric;
    newUser.phone = req.body.phone;
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("usernew", { error: err.message });
        }

        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Account Successfully Created! Nice to meet you " + req.body.firstname);
            res.redirect("/");
        });
    });
})

// logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Signed Out! See You Later");
    res.redirect("/");
});

module.exports = router;