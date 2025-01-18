const express = require('express');
const app = express();

// For now use in mem list of orders
let orders = [
  { id: 1, userId: 1, product: 'Laptop' },
  { id: 2, userId: 2, product: 'Headphones' }
];

// Health check endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Orders Service is up and running.' });
});

// GET /orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Start server on port 3002
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Orders Service running on port ${PORT}`);
});
