const express = require("express");
const app = express();
require("dotenv").config();
const session = require('express-session');
const passport = require('passport');
const initialize  = require('./services/passport');
const articlesRouter = require("./routes/articles");
const usersRouter = require('./routes/users');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session Express
app.use(session({
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
}));

//Passport
initialize(passport);

app.use(passport.initialize());
app.use(passport.session());

//Middleware Routes
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server is runnning on port " + PORT));
