const express = require('express');
const app = express();

// For now use in mem list of orders
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Health check endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Users Service is up and running.' });
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
