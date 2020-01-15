const router = require('express').Router();
const connection = require('../config/connection');

router.get('/', (req, res) => res.render('index'));

router.post('/users', (req, res) => {
  const { airport, date, time } = req.body;

  console.log(airport, date, time);

  res.status(200).send({
    success: true
  });
});

router.get('/airports', (req, res) => {
  const query = req.query.search;

  connection.query(
    `SELECT * FROM airport_details WHERE name LIKE '%${query}%'`,
    [query],
    (error, results) => {
      if (error) throw error;

      res.status(200).send(results);
    }
  );
});

module.exports = router;
