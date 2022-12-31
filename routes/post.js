const express = require("express");
const router = express.Router();
const {blogPost} = require("../models")
const {isLoggedIn} = require("../middlewares");
const dayjs = require("dayjs");
const now = dayjs();
let testDate = now.format("dddd, MMMM D YYYY")


router.get("/new", isLoggedIn, (req, res)=>{
    res.render("posts-form")
})

router.get("/:id/:title", (req, res) => {
    blogPost.findById(req.params.id, (err, foundPost)=>{
        if(err){
            console.log("oops!!")
            return res.send(err.message)
        }else if(foundPost.length<0){
            console.log(foundPost)
            return res.sendStatus(404)
        }
        res.render("single-post-page", {post: foundPost, date: testDate})
    })
})

router.post("/", isLoggedIn, (req, res)=>{
    const {firstName, lastName, id} = req.user;
    req.body.author = `${firstName} ${lastName}`
    req.body.authorId = id;
    blogPost.create(req.body, (err, createdPost)=>{
        if(err){
            return res.send(err.message)
        }
        res.redirect(`/post/${createdPost.id}/${createdPost.title}`)
    })
})

module.exports = router