const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

// Parse JSON request bodies
app.use(express.json());

// Endpoint to handle saving user details
app.post('/save_user', (req, res) => {
  const userData = req.body;

  // Execute the SQL query to insert/update user details in the database
  pool.query(
    'INSERT INTO users (firstName, middleName, lastName, email, phoneNumber, taxCategory, bidPrice) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [userData.firstName, userData.middleName, userData.lastName, userData.email, userData.phoneNumber, userData.taxCategory, userData.bidPrice],
    (error, results) => {
      if (error) {
        console.error('Error:', error);
        res.json({ success: false, error: 'Failed to save user details' });
      } else {
        console.log('User details saved successfully');
        res.json({ success: true });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
