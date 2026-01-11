const DoctorProfile = require("../models/DoctorProfile");

exports.createDoctorProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.create({
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
      message: "Could not create doctor profile",
    });
  }
};
