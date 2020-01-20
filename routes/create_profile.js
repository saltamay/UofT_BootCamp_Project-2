const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('create_profile');
});

module.exports = router;
