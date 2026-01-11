const express = require('express');
const {
  registerUser,
  loginUser
} = require('../controllers/userController');

const validateRequest = require('../middleware/validate');

const {
  registerSchema,
  loginSchema
} = require('../validation/userValidation');

const router = express.Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  registerUser
);

router.post(
  '/login',
  validateRequest(loginSchema),
  loginUser
);

module.exports = router;
