const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product_controller');

router.get('/', product_controller.get_product);
router.post('/', product_controller.add_one_product);
router.get('/get-by-category/:product_category_id', product_controller.get_product_by_category);
router.get('/:account_id', product_controller.get_product_by_account);
router.put('/:_id', product_controller.update_one_row);
router.delete('/', product_controller.delete);
module.exports = router;