const express = require('express');
const router = express.Router();
const user_bill_controller = require('../controllers/user_bill_controller');

router.get('/', user_bill_controller.get_user_bill);
router.post('/', user_bill_controller.add_one_bill);
router.get('/:user_id', user_bill_controller.get_user_bill_by_account);
router.put('/update-status/:_id', user_bill_controller.update_bill_status);
router.delete('/', user_bill_controller.delete);
module.exports =router;