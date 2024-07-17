require("dotenv").config()
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(session({
    secret : "shhhh",
    saveUninitialized : true,
    resave : true
}));

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", require("./routes/webRoute"));
app.use("/", require("./routes/adminRoute"));

app.get("*", (req,res)=>{
    res.render("errorPage")
})

app.listen(port)