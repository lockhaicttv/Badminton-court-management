const express = require('express');
const router = express.Router();
const account_controller = require('../controllers/account_controller');

router.get("/", account_controller.get_list_account);
router.post("/", account_controller.add_one_account);
router.post('/check-login', account_controller.check_login);

module.exports = router;