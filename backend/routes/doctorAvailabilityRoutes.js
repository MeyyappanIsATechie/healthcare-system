const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const {
  goOnline,
  goOffline,
} = require("../controllers/doctorAvailabilityController");

const router = express.Router();

router.post("/online", auth, requireRole("doctor"), goOnline);
router.post("/offline", auth, requireRole("doctor"), goOffline);

module.exports = router;
