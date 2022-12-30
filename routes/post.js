const express = require("express");
const router = express.Router();
const {blogPost} = require("../models")
const {isLoggedIn} = require("../middlewares");

router.get("/new", isLoggedIn, (req, res)=>{
    res.render("posts-form")
})

router.post("/", isLoggedIn, (req, res)=>{
    const {firstName, lastName, id} = req.user;
    req.body.author = `${firstName} ${lastName}`
    req.body.authorId = id;
    blogPost.create(req.body, (err, createdPost)=>{
        if(err){
            return res.send(err.message)
        }
        res.send(createdPost)
    })
})

module.exports = router