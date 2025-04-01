const express = require('express');
const { fetchAvailableTurfs, saveBooking } = require('../controllers/bookController');

const router = express.Router();

router.post('/fetchavailableturfs', fetchAvailableTurfs);
router.post('/savebooking', saveBooking);

module.exports = router;
