const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
    titleImage:  String,
    summary: {type: String, required: true},
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    category: { type: String, required: true },
    contentBody: { type: String, required: true },
    dateCreated: Date,
    lastUpdated: Date
})

const models = {
    user: mongoose.model("user", userSchema),
    blogPost: mongoose.model("blogpost", blogPostSchema)
}



module.exports = models;