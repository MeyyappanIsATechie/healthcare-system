const redis = require("../config/redis");
const logger = require("../utils/logger");



const acquireLock = async (doctorId) => {
  return await redis.set(`lock:doctor:${doctorId}`, "1", { NX: true, EX: 30 });
};

const findNearbyDoctors = async (lng, lat, radiusKm = 10) => {
  return await redis.geoRadius("doctors:geo", lng, lat, radiusKm, "km");
};

const findBestDoctor = async ({ lng, lat }) => {
  logger.info("Starting doctor allocation", {
    lat,
    lng,
  });
  const nearbyDoctors = await findNearbyDoctors(lng, lat);

  let bestDoctor = null;
  let minLoad = Infinity;

  for (const doctorId of nearbyDoctors) {
    const isAvailable = await redis.sIsMember("doctors:available", doctorId);
    if (!isAvailable) continue;

    const locked = await acquireLock(doctorId);
    if (!locked) {
      logger.warn("Doctor lock failed", { doctorId });
    }

    const load = parseInt((await redis.get(`doctor:${doctorId}:load`)) || "0");

    if (load < minLoad) {
      minLoad = load;
      bestDoctor = doctorId;
      break; // stop once lock acquired
    }
  }

  return bestDoctor;
};

module.exports = { findBestDoctor };
