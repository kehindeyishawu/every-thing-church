const express = require("express");
const app = express();

// config
app.use(express.static(__dirname + "/public"))
// app.use(express.static(__dirname + "/public"));

// route listeners


// Server initialization
app.listen(8080 || process.env.PORT, ()=>{
    console.log("Server has started running")
})