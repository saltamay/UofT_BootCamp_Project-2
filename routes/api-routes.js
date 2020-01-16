const router = require('express').Router();
const connection = require('../config/connection');

router.get('/', (req, res) => res.render('index'));

router.get('/users', (req, res) => {
  connection.query('SELECT * FROM users_details', (error, results) => {
    if (error) throw error;

    res.status(200).send({
      success: true,
      users: results
    });
  });
});

router.post('/users', (req, res) => {
  const { airport, date, time } = req.body;

  const airportName = airport.split(', ')[0];

  console.log(airportName, date, time);

  const query = `SELECT * FROM users_details JOIN trip_details ON users_details.id = trip_details.user_id WHERE trip_details.airport = '${airportName}' AND trip_details.trip_date = '${date}'`;

  connection.query(query, (error, results) => {
    if (error) throw error;

    res.status(200).send({
      success: true,
      users: results
    });
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
