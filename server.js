const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const User = require("./models/userModel");

mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, User };
