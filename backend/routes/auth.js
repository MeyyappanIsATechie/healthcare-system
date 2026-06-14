const express = require("express");
const passport = require("passport");
const { hasGoogleConfig } = require("../config/passport");

const router = express.Router();

const requireGoogleAuth = (req, res, next) => {
  if (!hasGoogleConfig) {
    return res.status(503).json({
      status: "error",
      message: "Google OAuth is not configured",
    });
  }
  next();
};

router.get(
  "/google",
  requireGoogleAuth,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  requireGoogleAuth,
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.json({
      token: req.user.token,
      user: {
        id: req.user.user._id,
        username: req.user.user.username,
        role: req.user.user.role,
        email: req.user.user.email,
      },
    });
  }
);

module.exports = router;
