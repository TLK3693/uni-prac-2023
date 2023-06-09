require("dotenv").config() // вызываем пакет и вызываем функцию
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");
const { body } = require('express-validator') // для валидации тела запроса
const cors = require("cors");

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");
const errorMiddleware = require('../server/middleware/error-middlewares.js')
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.API_URL
}));

connectDB();

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ 
  extended: true
 }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 30,
    },
  })
);

//=================== Routes
// Landing Page
app.get("/", appController.landingPage);

// Login Page
app.get("/login", appController.loginGet);
app.post("/login", appController.loginPost);

// Register Page
app.get("/register", appController.registerGet);
app.post("/register", body('email').isEmail(), body('password').isLength({ min: 4, max: 30 }), appController.registerPost);

// Dashboard Page
app.get("/dashboard", isAuth, appController.dashboardGet);

app.post("/logout", appController.logoutPost);
app.use(errorMiddleware)

app.listen(PORT, console.log("App Running"));
