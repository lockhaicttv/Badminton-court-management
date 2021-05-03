const express = require('express');
const router = express.Router();
const court_controller = require('../controllers/court_controller');

router.get('/', court_controller.get_list_court);
router.post('/',court_controller.add_one_court);
router.get('/get-by-account-id/:account_id',court_controller.get_court_by_account);
router.get('/get-by-id/:_id',court_controller.get_court_by_id);
router.put('/edit-image/:field_name/:court_id', court_controller.edit_banner);
router.put('/:_id', court_controller.update_one_row)
router.delete('/', court_controller.delete)

module.exports = router;