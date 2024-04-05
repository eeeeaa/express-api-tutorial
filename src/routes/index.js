const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
require("dotenv").config();
const { users, messages } = require("../models/sample");

const sessionRouter = require("./session");
const userRouter = require("./user");
const messageRouter = require("./message");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//mock current user - let the second user be the message's author
app.use((req, res, next) => {
  req.context = {
    users,
    messages,
    me: users[1],
  };
  next();
});

app.use("/session", sessionRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
