// In-memory data store for the application

// Users collection
// Example user: { id: 'uuid', email: 'test@test.com', phone: '123456', password: 'hash', role: 'customer' }
const users = [];

// Foods collection
// Example food: { id: 'uuid', name: 'Jollof Rice', description: 'Spicy Nigerian Jollof', price: 2500, isAvailable: true }
const foods = [
    {
        id: 'f1',
        name: 'Jollof Rice & Chicken',
        description: 'Spicy Nigerian Jollof Rice with Fried Chicken',
        price: 3500,
        isAvailable: true
    },
    {
        id: 'f2',
        name: 'Pounded Yam & Egusi',
        description: 'Freshly pounded yam with assorted egusi soup',
        price: 4000,
        isAvailable: true
    },
    {
        id: 'f3',
        name: 'Fried Rice & Turkey',
        description: 'Nigerian style fried rice with grilled turkey',
        price: 3800,
        isAvailable: false
    }
];

// Orders collection
// Example order: { id: 'uuid', customerId: 'uuid', items: [{ foodId: 'f1', quantity: 2, price: 3500}], totalAmount: 7000, status: 'Pending', createdAt: Date.now() }
const orders = [];

module.exports = {
    users,
    foods,
    orders
};
