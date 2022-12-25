const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    { user } = require("./models.js"),
    { isLoggedIn, isSignin } = require("./middlewares.js");

const publicFolder = __dirname + "/public/";

// register user function
// (()=>{
//     const newUser = new user({ username: req.body.username });
//     newUser.firstName = req.body.firstname;
//     newUser.lastName = req.body.lastname;
//     newUser.phoneNo = req.body.phone;
//     user.register(newUser, req.body.password, (err, user) => {
//         if (err) {
//             console.log(err.message);
//         }

//         passport.authenticate("local")(req, res, function () {
//             console.log("user created")
//         });
//     });
// })()

// Dashboard route
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard")
})

// login logic
router.post("/login", passport.authenticate("local",
    {
        failureFlash: true,
        failureRedirect: "/etc_admin",
    }), (req, res) => {
        req.flash("success", "Welcome Back")
        res.redirect("/dashboard")
    });
// **********************

// signup logic
router.post("/signup", (req, res) => {
    const newUser = new user({ username: req.body.username });
    newUser.firstName = req.body.firstname;
    newUser.lastName = req.body.lastname;
    newUser.phoneNo = req.body.phone;
    user.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
            return res.render("signup-page", { error: err.message });
        }

        passport.authenticate("local")(req, res, function () {
            // req.flash("success", "Account Successfully Created! Nice to meet you " + req.body.firstname);
            res.redirect("/dashboard");
            console.log("user created")
        });
    });
})

// logout logic
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash("success", "Successfully Signed Out! See You Later");
        res.redirect('/');
    })
});

module.exports = router;