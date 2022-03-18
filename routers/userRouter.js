const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.put(
  "/profile",
  upload.single("avatar"),
  async function (req, res, next) {
    try {
      let token = req.cookies.user;
      await userModel.updateOne(
        {
          token: token,
        },
        {
          avatar: req.file.path,
        }
      );
      res.json("Upload thành công");
    } catch (error) {
      res.status(500).json("Lỗi Sever");
    }
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);

router.get("/portfolio", (req, res) => {
  let token = req.cookies.user;
  userModel
    .findOne({
      token: token,
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.get("/role", (req, res) => {
  let token = req.cookies.user;
  userModel
    .findOne({
      token: token,
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/list", (req, res) => {
  userModel
    .find()
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });
    if (user) {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const token = jwt.sign({ id: user._id }, "1234");
        await userModel.updateOne(
          { _id: user._id },
          {
            token: token,
          }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        });
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(400).json({ message: "Mật khẩu không chính xác" });
      }
    } else {
      res.status(400).json({ message: "Username không tồn tại" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/logout", async (req, res) => {
  try {
    let token = req.cookies.user;
    await userModel.updateOne(
      {
        token: token,
      },
      {
        token: "",
      }
    );
    res.status(200).json({ message: "Successfull Log out" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(400).json({ message: "Username này không tồn tại" });
    } else {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const hash = await bcrypt.hash(req.body.newPassword, 10);
        await userModel.updateOne(
          {
            _id: user._id,
          },
          {
            password: hash,
          }
        );
        res.status(200).json({ message: "Update Password Successfull" });
      } else {
        res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/creat", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });
    if (user) {
      res.status(400).json({ message: "Username đã tồn tại" });
    } else {
      const creat = await userModel.create({
        username: req.body.username,
        school: req.body.school,
        address: req.body.address,
      });
      const list = await userModel.find();
      res.render("components/listUser", { listData: list });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await userModel.deleteOne({
      _id: req.params.id,
    });
    const list = await userModel.find();
    res.render("components/listUser", { listData: list });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed" });
  }
});

// router.put("/register", (req, res) => {
//   userModel
//     .updateOne(
//       {
//         password: req.body.password,
//       },
//       {
//         password: req.body.newPassword,
//       }
//     )
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
