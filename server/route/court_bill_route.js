const express = require('express');
const router = express.Router();
const court_bill_controller = require('../controllers/court_bill_controller');

router.get('/', court_bill_controller.get_court_bill);
router.post('/', court_bill_controller.add_one_bill);
router.get('/get-by-court_area/:court_area_id', court_bill_controller.get_bill_by_court_area);
router.get('/statistic/:court_id', court_bill_controller.statistic)
router.put('/update-status/:_id', court_bill_controller.update_bill_status);
router.get('/:account_id', court_bill_controller.get_court_bill_by_account);
router.delete('/', court_bill_controller.delete);
module.exports =router;