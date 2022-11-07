const express = require("express");
require("dotenv").config();
const connection = require("../config/db");
const userRouter = require("../Routes/user.routes");
const todoRouter = require("../Routes/todo.routes");
const authentication = require("../middleware/authnetication");
const cors = require("cors");

const PORT = process.env.PORT || 8040;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.use("/todo", authentication, todoRouter);

app.listen(PORT, async () => {
  try {
    await connection();
    console.log("MongoDB Connect");
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
