const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

// Configure bodyParser to parse JSON in the request body
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
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
app.post('/insertData', (req, res) => {
  // Extract name and email from the JSON request
  const { name, email } = req.body;
 
  // Connect to the database
  pool.connect().then((pool) => {
    // Insert data into the SQL Server table
    const query = `INSERT INTO ${process.env.TABLE} (Name, Email) VALUES (@name, @email)`;
    const request = pool.request();
    request.input('name', sql.VarChar, name);
    request.input('email', sql.VarChar, email);
    
    

    request.query(query).then(() => {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }).catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }).finally(() => {
      // Close the connection pool when done
      pool.close();
    });
  }).catch((err) => {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Internal Server Error');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
