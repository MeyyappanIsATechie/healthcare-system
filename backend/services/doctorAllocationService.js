const redis = require("../config/redis");

const findBestDoctor = async (lng, lat, radiusKm = 10) => {
  const nearbyDoctors = await redis.geoRadius(
    "doctors:geo",
    lng,
    lat,
    radiusKm,
    "km"
  );

  let bestDoctor = null;
  let minLoad = Infinity;

  for (const doctorId of nearbyDoctors) {
    const isAvailable = await redis.sIsMember("doctors:available", doctorId);
    if (!isAvailable) continue;

    const load = parseInt((await redis.get(`doctor:${doctorId}:load`)) || "0");

    if (load < minLoad) {
      minLoad = load;
      bestDoctor = doctorId;
    }
  }

  return bestDoctor;
};

module.exports = { findBestDoctor };
