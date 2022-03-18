const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const todoRouter = require("./routers/todoRouter");
const listRouter = require("./routers/listRouter");
const indexRouter = require("./routers/indexRouter");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/list", listRouter);
app.use("/", indexRouter);

app.listen(3000);
