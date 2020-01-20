const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Function ran');
    res.redirect('/');
  }
);

module.exports = router;
