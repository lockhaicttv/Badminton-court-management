const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/account_controller');

router.get("/", user_controller.get_list_account);
router.post("/", user_controller.add_one_account);

module.exports = router;