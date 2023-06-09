const bcrypt = require("bcryptjs");
const ApiError = require('../exeptions/api-errors');
const { validationResult } = require('express-validator') // Результат валидации
const User = require("../models/User");

exports.landingPage = (req, res, next) => {
  res.render("landing");
};

// <------------ЛОГИН------------>
exports.loginGet = (req, res, next) => {
  try {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", { err: error });

  } catch (e) {
    next(e);// Передаем в next() ошибку, если туда попадает ApiError то он будет обработон
  }

};

exports.loginPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      req.session.error = "Недействительные учетные данные";
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.session.error = "Недействительные учетные данные";
      return res.redirect("/login");
    }

    req.session.isAuth = true;
    req.session.username = user.username;
    res.redirect("/dashboard");
  } catch (e) {
    next(e)
  }

};

// <------------РЕГИСТРАЦИЯ------------>
exports.registerGet = (req, res, next) => {
  try {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", { err: error });
  } catch (e) {
    next(e);
  } 
};

exports.registerPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      req.session.error = "Пользователь уже существует";
      return res.redirect("/register");
    }

    const hasdPsw = await bcrypt.hash(password, 12);

    user = new User({
      username,
      email,
      password: hasdPsw,
    });

    await user.save();
    res.redirect("/login");
  } catch (e) {
    next(e);
  }

};

exports.dashboardGet = (req, res, next) => {
  try {
    const username = req.session.username;
    res.render("dashboard", { name: username });
  } catch (e) {
    next(e)
  }

};

// <------------ВЫХОД------------>
exports.logoutPost = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};
