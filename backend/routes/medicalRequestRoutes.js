const express = require("express");
const router = express.Router();

const {
  createMedicalRequest,
} = require("../controllers/medicalRequestController");
const auth = require("../middleware/auth"); // existing JWT middleware

router.post("/", auth, createMedicalRequest);

module.exports = router;
