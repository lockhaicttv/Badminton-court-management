const express = require('express');
const router = express.Router();
const court_controller = require('../controllers/court_controller');

router.get('/', court_controller.get_list_court);
router.post('/',court_controller.add_one_court);
router.get('/get-by-id/:account_id',court_controller.get_court_by_account);

module.exports = router;