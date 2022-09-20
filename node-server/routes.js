const express = require("express");
const controller = require("../node-server/controllers");
const router = express.Router();

router.post("/", controller.postTodo);

module.exports = router;
