module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = "Сперва Вы должны зайти в профиль";
    res.redirect("/login");
  }
};
