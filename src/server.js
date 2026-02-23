require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Chuks Kitchen API',
        status: 'success'
    });
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        status: 'error'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error',
        status: 'error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
