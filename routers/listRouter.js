const router = require("express").Router();
const todoModel = require("../models/todoModel");
const listModel = require("../models/listModel");
const { checkNotLogin, checkLogin, checkAdmin } = require("../checkForm");

router.get("/:id", async (req, res) => {
  try {
    const listTodo = await todoModel.find({
      listID: req.params.id,
    });
    res.render("pages/todoPage/todo", {
      listTodo,
      status: ["todo", "doing", "done"],
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/", checkNotLogin, async (req, res) => {
  try {
    const checkList = await listModel.findOne({
      listName: req.body.listName,
      userID: req.id,
    });
    if (!checkList) {
      await listModel.create({
        userID: req.id,
        listName: req.body.listName,
        color: req.body.color,
      });
      const listData = await listModel.find({ userID: req.id });
      res.status(200).render("pages/listPage/listData", { listData });
    } else {
      res.status(400).json({ message: "List này đã tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Loi Server" });
  }
});

router.delete("/:id", checkNotLogin, async (req, res) => {
  try {
    await listModel.deleteOne({ _id: req.params.id });
    await todoModel.deleteMany({ listID: req.params.id });
    const listData = await listModel.find({
      userID: req.id,
    });
    res.status(200).render("pages/listPage/listData", { listData });
  } catch (error) {
    res.status(500).json({ mess: "loi server", error });
  }
});

router.put("/:id/update", checkNotLogin, async (req, res) => {
  try {
    await listModel.updateOne(
      { _id: req.params.id },
      {
        listName: req.body.newListName,
        color: req.body.newColor,
      }
    );
    const listData = await listModel.find({
      userID: req.id,
    });
    res.status(200).render("pages/listPage/listData", { listData });
  } catch (error) {
    res.status(500).json({ mess: "loi server", error });
  }
});

module.exports = router;
