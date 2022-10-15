const express = require("express");
const app = express();

// config
require("dotenv").config()
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")

// route listeners
app.get("/", (req, res)=>{
    // res.render("index")
    res.send("I am working actually kenny")
})
app.get("/post", (req, res)=>{
    res.render("blog-posts")
})
app.get("/contact", (req, res)=>{
    res.render("contact")
})

// Server initialization
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server has started running on ${process.env.PORT}`)
})