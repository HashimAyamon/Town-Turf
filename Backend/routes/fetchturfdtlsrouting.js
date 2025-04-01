const express = require('express');
const { fetchTurfDetails } = require('../controllers/fetchturfdtlsController');

const router = express.Router();

router.post('/fetchdtls', fetchTurfDetails);

module.exports = router;
