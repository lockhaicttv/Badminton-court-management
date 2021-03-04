const express = require('express');
const router = express.Router();
const court_areas_controller = require('../controllers/court_areas_controller');

router.get('/', court_areas_controller.get_list_court_areas);
router.post('/', court_areas_controller.add_one_court_area);
router.put('/update-status/', court_areas_controller.update_status)

module.exports = router;