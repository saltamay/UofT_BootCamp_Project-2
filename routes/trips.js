const router = require('express').Router();
const connection = require('../config/connection');

router.get('/:userID', (req, res) => {
  const { userID } = req.params;

  connection.query(
    `SELECT * FROM Trip WHERE Trip.userId = ${userID}`,
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        trips: results
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newTrip = req.body;

  let query = 'UPDATE Trip SET ';

  Object.keys(newTrip).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(newTrip, key)) {
      let value = newTrip[key];
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      query += `${key}=${value}`;
    }
  });

  query += ` WHERE id=${id}`;

  connection.query(query, (error, results) => {
    if (error) throw error;

    if (results.affectedRows === 0) {
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).send({
      updated: true
    });
    return true;
  });
});

router.post('/', (req, res) => {
  const { userID, airport, date } = req.body;

  connection.query(
    'INSERT INTO Trip (userId, airport, tripDate) VALUES(?, ?, ?)',
    [userID, airport, date],
    error => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        trip: req.body
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM Trip WHERE id = ${id}`;

  connection.query(query, error => {
    if (error) throw error;

    res.status(200).send({
      deleted: true
    });
  });
});

module.exports = router;
