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

app.get("/home", function(req, res) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).then(function (user) {
            wishlist = user.wishlist
        }).catch(function (err) {
            console.log(err);
        })
        res.render("home");
    } else {
        res.redirect("/loginLanding");
    }
});

app.get("/profile", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("profile", {user: req.user});
    } else {
        res.redirect("/loginLanding");
    }
});

app.get("/editprofile", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("editprofile");
    } else {
        res.redirect("/loginLanding");
    }
});
app.get("/editpassword", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("editpassword");
    } else {
        res.redirect("/loginLanding");
    }
});
app.post("/editpassword", function(req, res) {
    User.findById(req.user._id).then(function (user) {
        console.log(req.body.password,req.body.npassword)
        user.changePassword(req.body.password, req.body.npassword, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/profile")
            }
        })
    })
})

app.post("/editprofile", function(req, res) {
    User.findById(req.user.email).then(function (user) {
        user.email = req.body.email;
        user.save().then(function () {
            res.redirect("/profile");
        }).catch(function (err) {
            console.log(err);
        })

    }).catch(function (err) {
        console.log(err);
        res.redirect("/editprofile")
    })

})

app.get("/loginLanding", function(req, res) {
    res.render("loginLanding");
})
app.get("/register", function(req, res) {
    res.render("register");
})
app.get("/registerSuccess", function(req, res) {
    res.render("registerSuccess");
})

app.get("/loginSuccess", function(req, res) {
    res.render("loginSuccess");
})

app.get("/logout", function(req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            cart = []
            res.redirect("/");

        }
    });
})


app.post("/login", function(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    req.login(user, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/loginLanding");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/home");
            })
        }
    })

})
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password).then(function(user) {
        passport.authenticate("local")(req, res, function() {
            res.redirect("/registerSuccess");
        })
    }) .catch(function(err) {
        console.log(err);
        res.redirect("/register")
    })
})


app.get("/product1", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product1");
    } else {
        res.redirect("/loginLanding");
    }
})
app.get("/product2", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product2");
    } else {
        res.redirect("/loginLanding");
    }
})
app.get("/product3", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product3");
    } else {
        res.redirect("/loginLanding");
    }
})
app.get("/product4", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product4");
    } else {
        res.redirect("/loginLanding");
    }
})
app.get("/product5", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product5");
    } else {
        res.redirect("/loginLanding");
    }
})
app.get("/product6", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("product6");
    } else {
        res.redirect("/loginLanding");
    }
})