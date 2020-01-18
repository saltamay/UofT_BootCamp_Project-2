const router = require('express').Router();
const connection = require('../config/connection');

router.get('/', (req, res) => res.render('index'));

router.get('/users', (req, res) => {
  connection.query('SELECT * FROM User', (error, results) => {
    if (error) throw error;

    res.status(200).send({
      success: true,
      User: results
    });
  });
});

router.get('/users/:id', (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        User: results
      });
    }
  );
});

router.post('/users', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'airport')) {
    const { airport, tripDate, timeSlot } = req.body;

    const airportName = airport.split(', ')[0];

    console.log(airportName, tripDate, timeSlot);

    const query = `SELECT * FROM User JOIN Trip ON User.id = Trip.userId WHERE Trip.airport = '${airportName}' AND Trip.tripDate = '${tripDate}'`;

    connection.query(query, (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        user: results
      });
    });
  } else {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      email,
      relationshipStatus,
      height,
      hairColour,
      tagline,
      bio,
      imageUrl
    } = req.body;

    const query = `INSERT INTO User
      (firstName, lastName, birthdate, gender, email, relationshipStatus, height, hairColor, tagline, bio, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        relationshipStatus,
        height,
        hairColour,
        tagline,
        bio,
        imageUrl
      ],
      error => {
        if (error) throw error;

        res.status(200).send({
          success: true,
          user: req.body
        });
      }
    );
  }
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM User WHERE id = ${id}`;

  connection.query(query, error => {
    if (error) throw error;

    res.status(200).send({
      deleted: true
    });
  });
});

router.get('/airports', (req, res) => {
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
