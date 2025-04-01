const express = require('express');
const {
    handleButtonPress,
    saveTurfInfo,
    editTurfInfo,
} = require('../controllers/turfInfoController');

const router = express.Router();

router.post('/buttonpress', handleButtonPress);
router.post('/save', saveTurfInfo);
router.post('/edit', editTurfInfo);

module.exports = router;
