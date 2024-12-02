// const mysql = require('mysql2');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',       // Replace with your PostgreSQL username
    host: 'localhost',           // PostgreSQL server address
    database: 'postgres',          // Your database name
    password: '1111',   // Replace with your PostgreSQL password
    port: 5432, 
});

module.exports = pool;

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',       // Replace with your PostgreSQL username
//     host: 'localhost',           // PostgreSQL server address
//     database: 'postgres',          // Your database name
//     password: '1111',   // Replace with your PostgreSQL password
//     port: 5432,                  // Default PostgreSQL port
// });


// const testConnection = async () => {
//   try {
//       const client = await pool.connect();

   
//       const res = await client.query('SELECT NOW()');
//       console.log('Connected to PostgreSQL. Server time:', res.rows[0].now);

  
//       client.release();
//   } catch (err) {
//       console.error('Error connecting to PostgreSQL:', err.message);
//   }
// };

// testConnection()



