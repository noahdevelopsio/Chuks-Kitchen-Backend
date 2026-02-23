const express = require('express');
const router = express.Router();
const { createOrder, getOrderDetails } = require('../controllers/orderController');

// Routes mapping to orderController
router.post('/', createOrder);
router.get('/:id', getOrderDetails);

module.exports = router;
