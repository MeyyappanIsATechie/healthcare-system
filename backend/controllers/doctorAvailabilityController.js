const DoctorProfile = require("../models/DoctorProfile");
const {
  markDoctorAvailable,
  markDoctorUnavailable,
} = require("../services/redisDoctorService");

exports.goOnline = async (req, res) => {
  const doctor = await DoctorProfile.findOne({ userId: req.user.userId });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor profile not found" });
  }

  const [lng, lat] = doctor.location.coordinates;
  await markDoctorAvailable(doctor._id.toString(), lng, lat);

  res.json({ status: "success", message: "Doctor is now online" });
};

exports.goOffline = async (req, res) => {
  const doctor = await DoctorProfile.findOne({ userId: req.user.userId });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor profile not found" });
  }

  await markDoctorUnavailable(doctor._id.toString());

  res.json({ status: "success", message: "Doctor is now offline" });
};
