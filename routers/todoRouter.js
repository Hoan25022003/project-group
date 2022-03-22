const router = require("express").Router();
const todoModel = require("../models/todoModel");
const { checkNotLogin, checkLogin, checkAdmin } = require("../checkForm");

router.get("/", (req, res) => {
  todoModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/", checkNotLogin, async (req, res) => {
  try {
    let arr = req.headers.referer.split("/");
    let length = arr.length;
    await todoModel.create({
      userID: req.id,
      listID: arr[length - 1],
      name: req.body.name,
      status: req.body.status,
      deadline: req.body.deadline,
    });
    res.status(200).json({ message: "Successfull" });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
    });
  }
});

router.delete("/:id", (req, res) => {
  todoModel
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.json({
        message: "Delete Successfull",
      });
    })
    .catch((err) =>
      res.json({
        message: "Delete Failed",
      })
    );
});

router.put("/update/:id", (req, res) => {
  todoModel
    .updateOne(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        status: req.body.status,
        deadline: req.body.deadline,
      }
    )
    .then((data) =>
      res.json({
        message: "Update Successfull",
      })
    )
    .catch((err) =>
      res.json({
        message: "Update Failed",
        err,
      })
    );
});

module.exports = router;
