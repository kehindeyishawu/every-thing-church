const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

// user schema
const userSchema = new mongoose.Schema(
    {
        email: String,
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNo: { type: String, required: true },
        password: String,
        status: { type: String, default: "writer" },
        isVerified: { type: Boolean, default: false },
        dateCreated: { type: Date, default: new Date() }
    }
)

userSchema.plugin(passportLocalMongoose)
// ***********************

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    frontImage: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    contentBeforeQuote: { type: String, required: true },
    contentAfterQuote: { type: String, required: true },
    blockQoute: String,
    dateCreated: { type: Date, default: new Date() },
    lastUpdated: { type: Date, default: new Date() }
})

const models = {
    user: mongoose.model("user", userSchema),
    blogPost: mongoose.model("blogpost", blogPostSchema)
}



module.exports = models;