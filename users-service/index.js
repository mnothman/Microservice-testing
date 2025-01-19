const express = require('express');
const app = express();

// For now use in mem list of orders
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'Healthy' });
});

// Readiness check endpoint
app.get('/ready', (req, res) => {
  res.status(200).send({ status: 'Ready' });
});

// GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// Start server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Users Service running on port ${PORT}`);
});
