const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie_parser = require("cookie-parser");

router.use(cookie_parser());

const userModel = require("../models/user");
const noticeModel = require("../models/notice");
const studyModel = require("../models/study");

// Home page
router.get("/", (req, res) => {
    res.render("index");
})

// new registration page
router.get("/admin/gloBalStudyCentEr/new/register", isLoggedIn ,(req, res) => {
    res.render("register");
})

// user login page
router.get("/login", (req, res) => {
    res.render("login");
})

// notice page
router.get("/curriculum", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email : req.user.email})
    let allNotices = await noticeModel.find();
    res.render("curriculum", {user, notices : allNotices})
})

// notes page
router.get("/studymaterial", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email : req.user.email})
    let allmaterials = await studyModel.find();
    res.render("StudyMatCurr", {user, allmaterials})
})

// logout route for user
router.get("/logout", (req,res)=>{
    res.cookie("token", "");
    res.redirect("/login")
})

// skill test page
router.get("/testOnline", isLoggedIn ,(req,res)=>{
    res.render("test");
})

// userProfile Page
router.get("/profile", isLoggedIn ,async (req,res)=>{
    let user = await userModel.findOne({email : req.user.email})
    res.render("profile", {user})
})

// deleting user
router.get("/delete/:id", async (req,res)=>{
    await userModel.findOneAndDelete({_id : req.params.id})
    res.redirect("/")
})

// editing user (page)
router.get("/edit/:userid", async (req,res)=>{
    let user = await userModel.findOne({_id : req.params.userid})
    res.render("editProfile", {user})
})

// updating user
router.post("/update/:userid", async (req,res)=>{
    let{name, address} = req.body
    let user = await userModel.findOneAndUpdate({_id : req.params.userid}, {name, address}, {new : true})
    res.redirect("/profile")
})


// dynamically login page

router.post("/register", async (req, res) => {
    let { name, email, password, course, address, phone } = req.body;
    let RegisteredUser = await userModel.findOne({ email, phone });
    if (RegisteredUser) return res.redirect("/login");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                name, email, password: hash, course, address, phone
            })
            let token = jwt.sign({ email }, process.env.SECRET_KEY);
            res.cookie("token", token);
            res.render("login")
        })
    })
})

router.post("/login", async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email, phone: req.body.phone });
    if (!user) return res.redirect("/");

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
            res.cookie("token", token);
            res.redirect("/curriculum")
        }
        else { res.redirect("/login") }
    })

})

router.post("/notice", async (req,res)=>{
    let {Nhead, Nbody} = req.body;
    let createdNotice = await noticeModel.create({
        Nhead,Nbody
    })
    res.redirect("/admin")
})

router.post("/materials", async (req,res)=>{
    let {Shead, SmatLink, Sbody} = req.body;
    let createdNotice = await studyModel.create({
        Shead, Sbody, SmatLink
    })
    res.redirect("/admin")
})



function isLoggedIn (req,res,next){
    if(req.cookies.token === "") return res.redirect("/login");
    else{
        let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        req.user = data
    }
    next()
}


module.exports = router