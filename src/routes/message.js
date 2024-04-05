const express = require("express");
const router = express.Router();
const uuid = require("uuid");

//Messages api routes
//get all messages
router.get("/", (req, res) => {
  return res.send(Object.values(req.context.messages));
});

//get one message
router.get("/:messageId", (req, res) => {
  return res.send(req.context.messages[req.params.messageId]);
});

//create a message
router.post("/", (req, res) => {
  const id = uuid.v4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.messages[id] = message;

  return res.send(message);
});

//update a message
router.put("/:messageId", (req, res) => {
  const message = {
    id: req.params.messageId,
    text: req.body.text,
    userId: req.context.me.id,
  };
  req.context.messages[req.params.messageId] = message;

  return res.send(message);
});

//delete a message
router.delete("/:messageId", (req, res) => {
  //dynamic object property:
  //exclude the message we want to delete from the rest of the messages object
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.messages;

  req.context.messages = otherMessages;

  return res.send(message);
});

module.exports = router;
