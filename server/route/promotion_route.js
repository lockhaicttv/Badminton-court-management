const express = require('express')
const router = express.Router()
const promotion_controller = require('../controllers/promotion_controller');

router.get('/', promotion_controller.get_all_promotion);
router.get('/get-by-court/:_id', promotion_controller.get_by_court)

router.post('/', promotion_controller.add_one_row)

router.put('/:_id', promotion_controller.update_one_row);

router.delete('/',promotion_controller.delete)
module.exports = router;