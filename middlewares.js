const { user } = require("./models.js");

const middlewares = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash("error", "You must be a loggedin to do this")
        res.redirect("/login")
    },

    isSignin: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect("/dashboard")
        }
    }
}

module.exports = middlewares