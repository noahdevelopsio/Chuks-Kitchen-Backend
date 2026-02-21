const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/mockData');

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = (req, res) => {
    try {
        const { email, phone, password, role = 'customer' } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ message: 'Email or phone is required', status: 'error' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required', status: 'error' });
        }

        // Check if user already exists
        const userExists = users.find(u => (email && u.email === email) || (phone && u.phone === phone));
        if (userExists) {
            return res.status(400).json({ message: 'User already exists', status: 'error' });
        }

        // Create user (Mock - no real password hashing)
        const newUser = {
            id: uuidv4(),
            email: email || null,
            phone: phone || null,
            password: password, // In real world, hash this
            role,
            isVerified: false,
            createdAt: Date.now()
        };

        users.push(newUser);

        res.status(201).json({
            message: 'User registered successfully. Please verify your account with OTP.',
            status: 'success',
            data: {
                id: newUser.id,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup', status: 'error' });
    }
};

// @desc    Verify user account (Simulated OTP)
// @route   POST /api/users/verify
// @access  Public
const verifyUser = (req, res) => {
    try {
        const { email, phone, otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: 'OTP is required', status: 'error' });
        }

        const user = users.find(u => (email && u.email === email) || (phone && u.phone === phone));

        if (!user) {
            return res.status(404).json({ message: 'User not found', status: 'error' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified', status: 'error' });
        }

        // Simulate OTP verification (e.g. require '123456')
        if (otp !== '123456') {
            return res.status(400).json({ message: 'Invalid or expired OTP', status: 'error' });
        }

        user.isVerified = true;

        res.status(200).json({
            message: 'Account verified successfully',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during verification', status: 'error' });
    }
};

module.exports = {
    signupUser,
    verifyUser
};
