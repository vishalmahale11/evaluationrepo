const express = require("express");
const app = express();
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    res.send({ msg: "User already signup please try another Email" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.status(400).send("Something Went wrong Please try after sometime");
      }
      const new_user = new userModel({
        email,
        password: hash,
      });
      try {
        await new_user.save();
        res.status(200).send({ msg: "Signup Successful" });
      } catch (error) {
        console.log(error);
        res.status(504).send({ msg: "Internal Server Error" });
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;
  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong, try again later" });
    }
    if (result) {
      const token = jwt.sign({ user_id }, process.env.SECRETE_KEY);
      res.send({ message: "Login successfull", token });
    } else {
      res.send({ msg: "Login failed" });
    }
  });
});

module.exports = app;
