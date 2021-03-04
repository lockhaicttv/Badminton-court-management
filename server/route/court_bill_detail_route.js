const express = require('express');
const router = express.Router();
const court_bill_detail_controller = require('../controllers/court_bill_detail_controller');

router.get('/', court_bill_detail_controller.get_bill_detail);
router.get('/get-by-bill-id/:court_bill_id', court_bill_detail_controller.get_bill_detail_by_billID);
router.post('/', court_bill_detail_controller.add_one_bill_detail);

module.exports = router;