const express = require('express')
const router = express.Router()
const court_booking_controller = require('../controllers/court_booking._contrller');

router.get('/', court_booking_controller.get_all_court_booking);
router.get('/:court_id', court_booking_controller.get_all_court_booking_by_court_id)
router.post('/', court_booking_controller.add_one_row)

router.put('/:_id', court_booking_controller.update_one_row);

router.delete('/',court_booking_controller.delete)
module.exports = router;