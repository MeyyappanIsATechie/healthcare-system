const mongoose = require("mongoose");

const DoctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorProfile", DoctorProfileSchema);
