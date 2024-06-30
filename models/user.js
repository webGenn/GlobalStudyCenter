const mongoose = require("mongoose");

const db = process.env.DB;

mongoose.connect(db).then(()=>{
    console.log("Connected Successfully");
}).catch((err)=>{
    console.log(err)
})

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    course : String,
    age : Number,
    phone : Number
})

module.exports = mongoose.model("user", userSchema);