const Joi = require("joi");

const patientProfileSchema = Joi.object({
  age: Joi.number().min(0).max(120).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  location: Joi.object({
    coordinates: Joi.array().length(2).items(Joi.number()).required(),
  }).required(),
  medicalHistorySummary: Joi.string().max(1000).allow(""),
});

const doctorProfileSchema = Joi.object({
  specialization: Joi.string().min(3).required(),
  yearsOfExperience: Joi.number().min(0).required(),
  location: Joi.object({
    coordinates: Joi.array().length(2).items(Joi.number()).required(),
  }).required(),
});

module.exports = {
  patientProfileSchema,
  doctorProfileSchema,
};
