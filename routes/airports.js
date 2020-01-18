const router = require('express').Router();
const connection = require('../config/connection');

router.get('/', (req, res) => {
  const query = req.query.search;

  connection.query(
    `SELECT * FROM Airport WHERE airportName LIKE '%${query}%'`,
    [query],
    (error, results) => {
      if (error) throw error;

      res.status(200).send(results);
    }
  );
});

module.exports = router;
