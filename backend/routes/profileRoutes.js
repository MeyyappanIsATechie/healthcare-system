const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const validate = require("../middleware/validate");

const {
  patientProfileSchema,
  doctorProfileSchema,
} = require("../validation/profileValidation");

const { createPatientProfile } = require("../controllers/patientController");

const { createDoctorProfile } = require("../controllers/doctorController");

const router = express.Router();

router.post(
  "/patient",
  auth,
  requireRole("patient"),
  validate(patientProfileSchema),
  createPatientProfile
);

router.post(
  "/doctor",
  auth,
  requireRole("doctor"),
  validate(doctorProfileSchema),
  createDoctorProfile
);

module.exports = router;
