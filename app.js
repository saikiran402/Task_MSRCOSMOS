const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  session = require("express-session"),
  moment = require("moment"),
  passport = require("passport"),
  nodemailer = require("nodemailer"),
  async      = require("async"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override");
    User = require("./models/user-model");



// requiring routes
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/user");

//this is used to run on local server ie., locsalhost:3000
// let url = process.env.DATABASEURL || "mongodb://localhost/demo";
// mongoose.connect(url, { useNewUrlParser: true });

const databaseUri = 'mongodb://saikiran2211:saikiran2233@ds311968.mlab.com:11968/task_cosmos';
mongoose.connect(databaseUri,{ useNewUrlParser: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.json());
app.locals.moment = moment; // create local variable available for the application


//passport configuration
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('user',new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
});



// pass currentUser to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user is an authenticated user
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// app.use('vendor',(req, res, next) => {
//   res.locals.currentVendor = req.user; // req.user is an authenticated user
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

// use routes
app.use("/", indexRoute);
app.use("/dashboard", usersRoute);


app.get("*",(req, res) => res.render("404"));

app.listen((process.env.PORT || 3000), function () {
  console.log("The Server Has Started!");
});


