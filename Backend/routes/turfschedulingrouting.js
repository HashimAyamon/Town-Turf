const express = require("express");
const { scheduleTurf } = require("../controllers/turfScheduleController");

const router = express.Router();


router.post("/schedule", scheduleTurf);

module.exports = router;
