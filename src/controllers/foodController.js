const { v4: uuidv4 } = require('uuid');
const { foods } = require('../data/mockData');

// @desc    Get all available food items
// @route   GET /api/foods
// @access  Public
const getFoods = (req, res) => {
    try {
        res.status(200).json({
            message: 'Foods retrieved successfully',
            status: 'success',
            data: foods
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving foods', status: 'error' });
    }
};

// @desc    Add a new food item (Admin Simulation)
// @route   POST /api/foods
// @access  Admin only (Simulated)
const addFood = (req, res) => {
    try {
        const { name, description, price, isAvailable = true } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required', status: 'error' });
        }

        const newFood = {
            id: uuidv4(),
            name,
            description: description || '',
            price,
            isAvailable
        };

        foods.push(newFood);

        res.status(201).json({
            message: 'Food item added successfully',
            status: 'success',
            data: newFood
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error adding food', status: 'error' });
    }
};

module.exports = {
    getFoods,
    addFood
};
