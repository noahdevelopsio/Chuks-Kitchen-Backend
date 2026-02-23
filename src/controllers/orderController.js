const { v4: uuidv4 } = require('uuid');
const { orders, foods, users } = require('../data/mockData');

// @desc    Create a new order from cart
// @route   POST /api/orders
// @access  Public (Customer)
const createOrder = (req, res) => {
    try {
        const { customerId, items } = req.body;

        if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Customer ID and cart items are required', status: 'error' });
        }

        // Verify user exists
        const user = users.find(u => u.id === customerId);
        if (!user) {
            return res.status(404).json({ message: 'Customer not found', status: 'error' });
        }

        // Validate items and calculate total
        let totalAmount = 0;
        const validatedItems = [];

        for (const item of items) {
            const food = foods.find(f => f.id === item.foodId);

            if (!food) {
                return res.status(404).json({ message: `Food item with ID ${item.foodId} not found`, status: 'error' });
            }

            if (!food.isAvailable) {
                return res.status(400).json({ message: `Food item ${food.name} is currently unavailable`, status: 'error' });
            }

            if (!item.quantity || item.quantity < 1) {
                return res.status(400).json({ message: `Invalid quantity for food item ${food.name}`, status: 'error' });
            }

            totalAmount += food.price * item.quantity;
            validatedItems.push({
                foodId: food.id,
                name: food.name,
                price: food.price,
                quantity: item.quantity
            });
        }

        const newOrder = {
            id: uuidv4(),
            customerId,
            items: validatedItems,
            totalAmount,
            status: 'Pending',
            createdAt: Date.now()
        };

        orders.push(newOrder);

        res.status(201).json({
            message: 'Order created successfully',
            status: 'success',
            data: newOrder
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error creating order', status: 'error' });
    }
};

// @desc    Fetch order details and status
// @route   GET /api/orders/:id
// @access  Public
const getOrderDetails = (req, res) => {
    try {
        const { id } = req.params;
        const order = orders.find(o => o.id === id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found', status: 'error' });
        }

        res.status(200).json({
            message: 'Order details retrieved successfully',
            status: 'success',
            data: order
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving order', status: 'error' });
    }
};

module.exports = {
    createOrder,
    getOrderDetails
};
