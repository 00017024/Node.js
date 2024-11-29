const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../db');

router.get('/', (req, res) => {
  res.render('home'); 
});


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; 

  try {
    const pool = await db;
    const INSERTquery = `
      INSERT INTO users (name, email, password)
      VALUES (@name, @email, @password);
    `;
    const request = pool.request();
    request.input('name', sql.NVarChar, name);
    request.input('email', sql.NVarChar, email);
    request.input('password', sql.NVarChar, password);
    await request.query(INSERTquery);

    res.status(201).send('User registered successfully!');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('An error occurred while registering the user.');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body; 

  try {
    const pool = await db; 
    const SELECTquery = `
      SELECT * FROM users
      WHERE email = @Email AND password = @Password;
    `;
    const request = pool.request();
    request.input('Email', sql.NVarChar, email);
    request.input('Password', sql.NVarChar, password);

    const result = await request.query(SELECTquery);
    if (result.recordset.length > 0) {
      res.status(200).send('Login successful!');
    } else {
      res.status(401).send('Invalid credentials. Please try again.');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('An error occurred while logging in.');
  }
});

module.exports = router;
