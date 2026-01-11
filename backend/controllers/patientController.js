const PatientProfile = require("../models/PatientProfile");

exports.createPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.create({
      userId: req.user.userId,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: profile,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Could not create patient profile",
    });
  }
};
