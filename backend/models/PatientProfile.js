const mongoose = require("mongoose");

const PatientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        index: "2dsphere",
      },
    },
    medicalHistorySummary: {
      type: String,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientProfile", PatientProfileSchema);
