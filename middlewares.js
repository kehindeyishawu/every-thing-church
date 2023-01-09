const { blogPost } = require("./models.js");

const middlewares = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.app.locals.returnTo = req.originalUrl
        req.flash("error", "You must be a loggedin to do this")
        res.redirect("/etc_admin")
    },

    ifSignedInAlready: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard")
        }
        next()
    },

    postAuthorization: (req, res, next)=>{
        blogPost.findById(req.params.id, (err, foundPost)=>{
            if (err){
                console.log(`error from post autjorization middleware:\n ${err.message}`)
                return res.status(404).render("404-page")
            }
            if(foundPost.authorId === req.user.id || req.user.status === "admin"){
                res.locals.postContent = foundPost;
                return next()
            }else{
                req.flash("error", "You are not authorised to edit this post");
                res.redirect(`/post/${foundPost.id}/${foundPost.title}`)
            }
        })
    }
}

module.exports = middlewares