const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const todoModel = require("../models/todoModel");
const listModel = require("../models/listModel");
const { checkNotLogin, checkLogin, checkAdmin } = require("../checkForm");

router.get("/test", async (req, res) => {
  try {
    const list = await userModel.find();
    res.render("test", { listData: list });
  } catch (error) {
    res.status(500).json({ message: "loi sever" });
  }
});

router.get("/List", checkNotLogin, async (req, res) => {
  try {
    const listData = await listModel.find({
      userID: req.id,
    });
    res.render("pages/listPage/list", { listData });
  } catch (error) {
    res.status(500).json({ mess: "Error" });
  }
});

router.get("/Home", (req, res) =>
  res.sendFile(path.join(__dirname, "../views/home.html"))
);

router.get("/Login", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/Register", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.get("/Admin", checkAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});

router.get("/Portfolio", checkNotLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/portfolio.html"));
});

router.get("/change-password", checkNotLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/change.html"));
});

router.get("/Profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/profile.html"));
});

module.exports = router;
