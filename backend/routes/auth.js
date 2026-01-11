const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
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
