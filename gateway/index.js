const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL;
const ORDERS_SERVICE_URL = process.env.ORDERS_SERVICE_URL;



console.log('USERS_SERVICE_URL:', process.env.USERS_SERVICE_URL);
console.log('ORDERS_SERVICE_URL:', process.env.ORDERS_SERVICE_URL);


// Health check endpoint for the gateway itself
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'Healthy' });
});

// Readiness check endpoint for the gateway
app.get('/ready', (req, res) => {
  res.status(200).send({ status: 'Ready' });
});

// Route to users service
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${USERS_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to orders service
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${ORDERS_SERVICE_URL}/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server on port 3000 (gateway port)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
