const express = require('express');
const router = express.Router();
const { fetchUserHistory } = require('../controllers/userHistoryController');

router.post('/buttonpress', fetchUserHistory);

module.exports = router;
