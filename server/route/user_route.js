const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get("/?", user_controller.get_user);
router.post("/", user_controller.add_one_user);
router.get('/check-exist/:username', user_controller.check_exist);

module.exports = router;