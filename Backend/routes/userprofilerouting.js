const express = require('express');
const router = express.Router();
const { fetchUserProfile, saveUserProfile, editUserProfile } = require('../controllers/userProfileController');


router.post('/buttonpress', fetchUserProfile);


router.post('/save', saveUserProfile);


router.post('/edit', editUserProfile);

module.exports = router;
