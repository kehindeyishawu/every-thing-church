const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

// user schema
const userSchema = new mongoose.Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        phoneNo: String,
        password: String,
        status: {type: String, default: "writer"},
        dateCreated: {type: Date, default: new Date()}
    }
)

userSchema.plugin(passportLocalMongoose)
// ***********************

const blogPostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    frontImage: {type: String, required: true},
    author: String,
    category: {type: String, required:true},
    contentBeforeQuote: {type: String, required: true},
    contentAfterQuote: {type: String, required: true},
    blockQoute: String,
    dateCreated: {type: Date, default: new Date()}
})

const models = {
    user: mongoose.model("user", userSchema),
    blogPost: mongoose.model("blogpost", blogPostSchema)
}



module.exports = models;