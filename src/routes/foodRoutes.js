const express = require('express');
const router = express.Router();
const { getFoods, addFood } = require('../controllers/foodController');

// Routes mapping to foodController
router.get('/', getFoods);
router.post('/', addFood); // Simulated Admin Route

module.exports = router;
