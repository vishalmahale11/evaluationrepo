const express = require("express");
const app = express();
const todoModel = require("../models/todo.model");

app.use(express.json());

app.get("/get", async (req, res) => {
  const todo = await todoModel.find({ user_id: req.body.user_id });
  res.send(todo);
});

app.post("/post", async (req, res) => {
  const { taskname, status, tag } = req.body;
  const todo = new todoModel({
    taskname,
    status,
    tag,
  });
  try {
    await todo.save();
    res.send({ msg: "Todo Created Successfull", todo: todo });
  } catch (error) {
    console.log(error);
    res.status(505).send({ msg: "Somthing went wrong" });
  }
});

app.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;
  const newData = await todoModel.findOneAndUpdate({ _id: id }, req.body);
  if (newData) {
    res.send({ msg: "Updated sucessfully", newData: newData });
  } else {
    res.send({ msg: "Can't Updated" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const newData = await todoModel.findOneAndDelete({ _id: id }, req.body);
  if (newData) {
    res.send({ msg: "Deleted sucessfully", newData: newData });
  } else {
    res.send({ msg: "Can't Deleted" });
  }
});

module.exports = app;
