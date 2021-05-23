const express = require('express');
const router = express.Router();
const ai_controller = require('../controllers/ai_service');

router.put('/:func', ai_controller.handle_function)

module.exports = router