const express = require('express');
const controller = require('../node-server/controllers');
const router = express.Router();

router.post('/:id', controller.postSendFile);

router.use('/', controller.getRender);

module.exports = router;