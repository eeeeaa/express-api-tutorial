const express = require("express");
const router = express.Router();

//User api routes
//get all users
router.get("/", (req, res) => {
  return res.send(Object.values(req.context.users));
});

//get one user
router.get("/:userId", (req, res) => {
  return res.send(req.context.users[req.params.userId]);
});

module.exports = router;
