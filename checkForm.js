const userModel = require("./models/userModel");
const jwt = require("jsonwebtoken");

function checkNotLogin(req, res, next) {
  if (req.cookies.user) {
    userModel
      .findOne({
        token: req.cookies.user,
      })
      .then((data) => {
        if (data) {
          req.id = data._id;
          next();
        } else {
          res.redirect("/Login");
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.redirect("/Login");
  }
}

function checkLogin(req, res, next) {
  if (req.cookies.user) {
    const id = jwt.verify(req.cookies.user, "1234").id;
    userModel
      .findOne({
        _id: id,
      })
      .then((data) => {
        if (data) {
          res.redirect("/Home");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    next();
  }
}

const checkAdmin = (req, res, next) => {
  const userID = req.cookies.user;
  if (userID) {
    userModel
      .findOne({
        token: userID,
      })
      .then((data) => {
        if (data.role == "admin") {
          next();
        } else {
          res.redirect("/Home");
        }
      })
      .catch((err) => res.status(400).json(err));
  } else {
    res.redirect("/Login");
  }
};

module.exports = { checkNotLogin, checkLogin, checkAdmin };
