// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
const session = require('express-session');
const path = require("path");
const Car = require('./models/cars')
const carsController = require('./controllers/carsroute')
const authController = require('./controllers/auth.js');



// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require('./middleware/pass-user-to-view.js');

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passUserToView); // Middleware to pass user to views
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/jobs`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});

// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB OMAR")})


// =======================
// 4. ROUTES
// =======================
app.use('/auth', authController);
app.use('/cars', carsController)
// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
  
  


