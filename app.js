const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://mariaislam7:mariabrintu@cluster0.ssbh3pm.mongodb.net/?retryWrites=true&wtimeoutMS=5000/customerInfo ", {useNewUrlParser: true});

let cart = []
let wishlist = []
let total = 0;