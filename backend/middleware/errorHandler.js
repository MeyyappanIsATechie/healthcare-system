const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error("Unhandled error", {
    requestId: req.requestId,
    message: err.message,
    path: req.path,
    method: req.method,
  });

  res.status(err.status || 500).json({
    error: "Internal server error",
  });
};
