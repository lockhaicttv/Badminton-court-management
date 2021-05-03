const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get("/?", user_controller.get_user);
router.post("/", user_controller.add_one_user);
router.get('/check-exist/:username', user_controller.check_exist);
router.put('/:_id', user_controller.update_one_row);
router.delete('/', user_controller.delete)
module.exports = router;