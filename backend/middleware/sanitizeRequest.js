const mongoSanitize = require("express-mongo-sanitize");
const { clean: cleanXss } = require("xss-clean/lib/xss");

const replaceContents = (target, source) => {
  if (Array.isArray(target) && Array.isArray(source)) {
    target.splice(0, target.length, ...source);
    return;
  }

  if (target && typeof target === "object" && source && typeof source === "object") {
    Object.keys(target).forEach((key) => delete target[key]);
    Object.assign(target, source);
  }
};

const sanitizeValue = (value) => cleanXss(mongoSanitize.sanitize(value));

const sanitizeRequestPart = (req, key) => {
  if (!req[key]) return;

  const sanitized = sanitizeValue(req[key]);

  try {
    req[key] = sanitized;
  } catch (err) {
    replaceContents(req[key], sanitized);
  }
};

module.exports = (req, res, next) => {
  sanitizeRequestPart(req, "body");
  sanitizeRequestPart(req, "params");
  sanitizeRequestPart(req, "query");
  next();
};
