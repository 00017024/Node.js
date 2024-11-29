const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = 'SELECT id, name, email, last_login, status FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    } else {
      res.render('user-management', { users: results });
    }
  });
});


router.post('/block', (req, res) => {
  const userIds = req.body.userIds;
  const query = 'UPDATE users SET status = ? WHERE id IN (?)';

  db.query(query, ['blocked', userIds], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error blocking users');
    } else {
      res.redirect('/users');
    }
  });
});


router.post('/unblock', (req, res) => {
  const userIds = req.body.userIds;
  const query = 'UPDATE users SET status = ? WHERE id IN (?)';

  db.query(query, ['active', userIds], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error unblocking users');
    } else {
      res.redirect('/users');
    }
  });
});


router.post('/delete', (req, res) => {
  const userIds = req.body.userIds;
  const query = 'DELETE FROM users WHERE id IN (?)';

  db.query(query, [userIds], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting users');
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
