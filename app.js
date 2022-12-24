const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const {user, blogPost} = require("./models.js")
const middleware = require("./middlewares.js");
const routes = require("./routes")

// config
require("dotenv").config()
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Database connection via mongoose
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_LINK)
    .catch(err => {
        console.log("Error from DD", err.message)
    })

// passport & connect-flash config
app.use(flash());
app.use(require("express-session")({
    secret: "good",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser())
// ********************

// Passing global Values Into Routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
// ***************

// route listeners
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/post", (req, res) => {
    res.render("single-post-page")
})
app.get("/contact", (req, res) => {
    res.render("contact-page")
})
app.use(routes)

// Server initialization
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started running on ${process.env.PORT}`)
})