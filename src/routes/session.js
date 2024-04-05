const express = require("express");
const router = express.Router();

//get current authenticated user session
router.get("/", (req, res) => {
  return res.send(req.context.users[req.context.me.id]);
});

module.exports = router;
