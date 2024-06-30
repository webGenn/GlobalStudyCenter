const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
    Nhead : {
        type : String,
        required : true
    },
    Nbody : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
})

module.exports = mongoose.model("notice", noticeSchema);