const express = require("express");
const router = express.Router();

router.get("/new", (req, res)=>{
    res.render("posts-form")
})

module.exports = router