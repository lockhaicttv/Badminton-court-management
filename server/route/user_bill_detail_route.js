const express = require('express');
const router = express.Router();
const user_bill_detail_controller = require('../controllers/user_bill_detail_controller');

router.get('/', user_bill_detail_controller.get_user_bill_detail);
router.get('/get-by-user-bill-id/:user_bill_id', user_bill_detail_controller.get_bill_detail_by_billID);
router.post('/', user_bill_detail_controller.add_one_user_bill_detail);

module.exports = router;