const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product_controller');

router.get('/?', product_controller.get_product);
router.get('/get-by-category/:product_category_id', product_controller.get_product_by_category);
router.get('/get-product-on-shop-page/:product_category_id', product_controller.get_product_by_category_on_shoppage)
router.get('/on-shop-page', product_controller.get_all_on_shop_page)
router.get('/get-product-by-court-on-shoppage/:court_id', product_controller.get_product_by_court_on_shoppage)
router.get('/:court_id', product_controller.get_product_by_court);
router.get('/get-by-account-id/:account_id', product_controller.get_product_by_account_id);
router.get('/get-court-by-product/:_id', product_controller.get_court_by_product);
router.get('/check-quantity-remain/:product_id', product_controller.check_quantity_remain)

router.post('/', product_controller.add_one_product);

router.put('/:_id', product_controller.update_one_row);

router.delete('/', product_controller.delete);

module.exports = router;