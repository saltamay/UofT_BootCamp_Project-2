const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
