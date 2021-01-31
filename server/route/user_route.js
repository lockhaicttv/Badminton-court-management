const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get("/", user_controller.get_list_user);
router.post("/", user_controller.add_one_user);

module.exports = router;