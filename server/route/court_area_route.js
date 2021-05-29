const express = require('express');
const router = express.Router();
const court_areas_controller = require('../controllers/court_areas_controller');

router.get('/?', court_areas_controller.get_list_court_areas);
router.get('/get-by-court/:court_id', court_areas_controller.get_list_court_areas_by_courtId)
router.get('/:account_id', court_areas_controller.get_list_area_by_account);
router.post('/', court_areas_controller.add_one_court_area);
router.put('/update-status/', court_areas_controller.update_status);
router.put('/:_id', court_areas_controller.update_one_row);
router.delete('/', court_areas_controller.delete);

module.exports = router;