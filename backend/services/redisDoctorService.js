const redis = require("../config/redis");

const markDoctorAvailable = async (doctorId, lng, lat) => {
  await redis.sAdd("doctors:available", doctorId);
  await redis.geoAdd("doctors:geo", {
    longitude: lng,
    latitude: lat,
    member: doctorId,
  });
};

const markDoctorUnavailable = async (doctorId) => {
  await redis.sRem("doctors:available", doctorId);
  await redis.geoRemove("doctors:geo", doctorId);;
};

const incrementDoctorLoad = async (doctorId) => {
  await redis.incr(`doctor:${doctorId}:load`);
};

const decrementDoctorLoad = async (doctorId) => {
  await redis.decr(`doctor:${doctorId}:load`);
};

module.exports = {
  markDoctorAvailable,
  markDoctorUnavailable,
  incrementDoctorLoad,
  decrementDoctorLoad,
};
