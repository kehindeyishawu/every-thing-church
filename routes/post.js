const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");
const {blogPost} = require("../models")
const {isLoggedIn, postAuthorization} = require("../middlewares");
const dayjs = require("dayjs");


// Edit post route
router.get("/:id/edit", isLoggedIn, postAuthorization, (req, res)=>{
    return res.render("edit-post-form")
})

router.patch("/:id", isLoggedIn, postAuthorization, (req, res)=>{
    let postImage = req.body.image;
    delete req.body.image;
    req.body.contentBody = sanitizeHtml(req.body.contentBody, {allowedAttributes: false});
    blogPost.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost)=>{
        if (err){
            req.flash("error", err.message)
            return res.redirect(`/post/${res.locals.postContent.id}/edit`)
        }
        req.flash("success", "You have successfully updated this post")
        res.redirect(`/post/${updatedPost.id}/${updatedPost.title}`)
    })
})

// Show Blog Posts
router.get("/:id/:title", (req, res) => {
    blogPost.findById(req.params.id, (err, foundPost)=>{
        if(err){
            console.log(`oops!!\n ${err.message}`)
            return res.status(404).render("404-page")
        }else if(req.params.title !== foundPost.title){
            return res.redirect(`/post/${foundPost.id}/${foundPost.title}`)
        }
        const updated = dayjs(foundPost.lastUpdated).format("MMM D YYYY");
        res.render("single-post-page", {post: foundPost, update: updated})
    })
})

// Create new post route
router.get("/new", isLoggedIn, (req, res)=>{
    res.render("create-post-form")
})

router.post("/", isLoggedIn, (req, res)=>{
    if(req.body.title.length > 55 || req.body.title.length < 6){
        req.flash("error", "Title length not within required range")
        return res.render("posts-form")
    }
    
    const {firstName, lastName, id} = req.user;
    req.body.author = `${firstName} ${lastName}`
    req.body.authorId = id;
    req.body.contentBody = sanitizeHtml(req.body.contentBody, {allowedAttributes: false});
    blogPost.create(req.body, (err, createdPost)=>{
        if(err){
            req.flash("error", err.message);
            return res.render("create-post-form");
        }
        res.redirect(`/post/${createdPost.id}/${createdPost.title}`)
    })
})

// Delete blog post route
router.delete("/id", isLoggedIn, postAuthorization, (req, res)=>{
    blogPost.findByIdAndDelete(req.params.id, (err)=>{
        if (err){
            req.flash("error", err.message);
            return res.redirect(`/post/${res.locals.postContent.id}/${res.locals.postContent.title}`);
        }
        req.flash("success", "Blog post deleted");
        res.redirect("/dashboard");
    })
})

module.exports = router