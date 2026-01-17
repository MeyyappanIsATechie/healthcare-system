const MedicalRequest = require("../models/MedicalRequest");
const { findBestDoctor } = require("../services/doctorAllocationService");
const { incrementDoctorLoad } = require("../services/redisDoctorService");
const logger = require("../utils/logger");

const createMedicalRequest = async (req, res, next) => {
  try {
    const { symptomsText, lng, lat } = req.body;

    logger.info("Incoming medical request", {
      requestId: req.requestId,
      patientId: req.user.id,
    });

    // 1. Persist request first (source of truth)
    const request = await MedicalRequest.create({
      patientId: req.user.id,
      symptomsText,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    let assignedDoctorId = null;

    // 2. Attempt allocation
    try {
      assignedDoctorId = await findBestDoctor({ lng, lat });
    } catch (err) {
      logger.error("Allocation attempt failed", {
        requestId: req.requestId,
        error: err.message,
      });
    }

    // 3. If allocation succeeded
    if (assignedDoctorId) {
      request.status = "ASSIGNED";
      request.assignedDoctorId = assignedDoctorId;
      await request.save();

      await incrementDoctorLoad(assignedDoctorId);

      logger.info("Doctor assigned", {
        requestId: req.requestId,
        doctorId: assignedDoctorId,
      });
    }

    // 4. Respond
    res.status(201).json({
      requestId: request._id,
      status: request.status,
      doctorId: assignedDoctorId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createMedicalRequest };
