const express = require('express');
const router = express.Router();
const { signupUser, verifyUser } = require('../controllers/userController');

// Routes mapping to userController
router.post('/signup', signupUser);
router.post('/verify', verifyUser);

module.exports = router;
