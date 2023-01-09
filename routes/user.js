const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    { user } = require("../models.js");


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

// login logic
router.post("/login", passport.authenticate("local",
    {
        failureFlash: true,
        failureRedirect: "/etc_admin",
    }), (req, res) => {
        req.flash("success", "Welcome Back")
        const redirectUrl = req.app.locals.returnTo || "/dashboard";
        delete req.app.locals.returnTo;
        res.redirect(redirectUrl);
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