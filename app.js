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


const userSchema = new mongoose.Schema({


    username: String,
    email: String,
    password: String,
    cart: [mongoose.Schema.Types.Mixed],
    wishlist: [mongoose.Schema.Types.Mixed]
})
const orderSchema = new mongoose.Schema({
    _id: String,
    fname: String,
    lname: String,
    phone: String,
    email: String,
    city: String,
    address_1: String,
    zip: String,
    cart: [mongoose.Schema.Types.Mixed]
})
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/home");

    } else {
        res.render("index");
    }
});

