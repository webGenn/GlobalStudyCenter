const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie_parser = require("cookie-parser");

router.use(cookie_parser())

router.get("/admin", async (req,res)=>{
    res.render("admin/index")
})

router.post("/admin", async (req, res) => {
    try {
        const {username, password} = req.body;
        
        if(req.body.username === process.env.admin_username && req.body.password === process.env.admin_password){
            res.render("admin/dashboard")
        }else{
            res.redirect("/admin")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router