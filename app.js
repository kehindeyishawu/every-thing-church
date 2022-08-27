const express = require("express");
const app = express();

// config
app.use(express.static(__dirname + "/public"))
// app.use(express.static(__dirname + "/public"));

// route listeners


// Server initialization
app.listen(5000, ()=>{
    console.log("Server has started running")
})