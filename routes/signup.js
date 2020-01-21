const router = require('express').Router();

const { createUser } = require('../controllers/users.js');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', createUser, (req, res) => {
  console.log('User Added');
  res.redirect('/');
});

module.exports = router;
