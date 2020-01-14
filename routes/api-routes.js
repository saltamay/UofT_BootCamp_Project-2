const router = require('express').Router();

router.get('/', (req, res) => res.render('index'));

router.post('/users', (req, res, next) => {
  const { airport, date, time } = req.body;

  console.log(airport, date, time);

  res.status(200).send({
    success: true
  });
});

module.exports = router;
