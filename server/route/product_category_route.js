const express = require('express');
const router = express.Router();
const product_category_controller = require('../controllers/product_category_controller');

router.get('/', product_category_controller.get_product_category);
router.post('/',product_category_controller.add_product_category);
router.get('/get-by-account/:account_id',product_category_controller.get_product_category_by_account);
router.put('/:_id?', product_category_controller.update_one_row);
router.delete('/', product_category_controller.delete);
module.exports = router;