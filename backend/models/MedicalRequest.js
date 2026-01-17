const mongoose = require("mongoose");

const MedicalRequestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  symptomsText: {
    type: String,
    required: true,
  },

  symptomEmbedding: {
    type: [Number], // vector
    default: null, // null until AI plugged in
  },

  urgencyScore: {
    type: Number, // e.g., 0–1 or 1–5
    default: null,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },

  status: {
    type: String,
    enum: ["PENDING", "ASSIGNED", "CANCELLED"],
    default: "PENDING",
  },

  assignedDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MedicalRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("MedicalRequest", MedicalRequestSchema);
