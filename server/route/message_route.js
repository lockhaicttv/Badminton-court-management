const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/message_controller');


router.get('/', message_controller.get_message);
router.delete('/', message_controller.delete);
module.exports = router;