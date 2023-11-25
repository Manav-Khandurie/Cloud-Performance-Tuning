const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Configure database connection
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true,
  },
};

// Create a connection pool
const pool = new sql.ConnectionPool(config);

// Define a route to handle JSON requests
app.post('/insertData', async (req, res) => {
  // Extract name and email from the JSON request
  const { name, email } = req.body;

  try {
    // Connect to the database
    const poolConnection = await pool.connect();

    try {
      // Insert data into the SQL Server table
      const query = `INSERT INTO ${process.env.TABLE} (Name, Email) VALUES (@name, @email)`;
      const request = poolConnection.request();
      request.input('name', sql.VarChar, name);
      request.input('email', sql.VarChar, email);

      await request.query(query);

      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    } finally {
      // Release the connection back to the pool
      poolConnection.release();
    }
  } catch (err) {
    console.error('Error:', err);

    if (err instanceof sql.ConnectionError) {
      // Handle connection error separately
      res.status(500).send('Error connecting to the database');
    } else {
      // Handle other errors
      res.status(500).send('Internal Server Error');
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3334;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the connection pool gracefully when the server is stopped
process.on('SIGTERM', async () => {
  try {
    await pool.close();
    console.log('Connection pool closed');
  } catch (err) {
    console.error('Error closing connection pool:', err);
  } finally {
    // Ensure the server is stopped
    server.close();
  }
});

// Close the connection pool when the server is stopped
server.on('close', () => {
  console.log('Server closed');
});
