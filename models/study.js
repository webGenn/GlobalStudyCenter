const mongoose = require("mongoose");

const studySchema = mongoose.Schema({
    Shead : {
        type : String,
        required : true
    },
    SmatLink : {
        type : String,
        required : true
    },
    Sbody : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
})

module.exports = mongoose.model("studyMaterial", studySchema);