const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoSanitize = require('express-mongo-sanitize');
const flash = require("connect-flash");
const { user, blogPost } = require("./models.js")
const { isLoggedIn } = require("./middlewares.js");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// config
require("dotenv").config()
app.use(express.static(__dirname + "/public/"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Database connection via mongoose
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_LINK)
    .then(() => { console.log("Connected To DB") })
    .catch(err => {
        console.log("Error from DD:", err.message)
    })

app.use(
    mongoSanitize({
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        },
    }),
);

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
    blogPost.find({}, (err, foundPosts) => {
        if (err) {
            return res.send(err)
        }
        res.render("index", { blogPosts: foundPosts })
    })
})
app.get("/contact", (req, res) => {
    res.render("contact-page")
})
app.get("/etc_admin", (req, res) => {
    res.render("login-page")
})
app.get("/signup", (req, res) => {
    res.render("signup-page")
})
app.get("/dashboard", isLoggedIn, (req, res) => {
    blogPost.find({authorId: req.user.id}, (err, foundPosts) => {
        if (err) {
            return res.send(err)
        }
        res.render("dashboard", { blogPosts: foundPosts })
    })
})
// app.get("/sample", (req, res)=>{
//     res.render("sample")
// })
app.use(userRoutes)
app.use("/post", postRoutes)
app.use((req, res, next) => {
    res.status(404).render("404-page")
})

// Server initialization
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started running on ${process.env.PORT || 3000}`)
})