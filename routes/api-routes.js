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

router.get('/users/:id', (req, res) => {
  connection.query(
    `SELECT * FROM users_details WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        user: results
      });
    }
  );
});

router.post('/users', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'airport')) {
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
  } else {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      relationshipStatus,
      height,
      hairColour,
      tagline,
      bio,
      imageUrl
    } = req.body;

    const query = `INSERT INTO users_details
      (first_name, last_name, birthdate, email, relationship_status, height, hair_color, tagline, bio, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        firstName,
        lastName,
        birthDate,
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

  const query = `DELETE FROM users_details WHERE id = ${id}`;

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
    `SELECT * FROM airport_details WHERE name LIKE '%${query}%'`,
    [query],
    (error, results) => {
      if (error) throw error;

      res.status(200).send(results);
    }
  );
});

router.post('/trips', (req, res) => {
  const { userID, airport, date } = req.body;

  connection.query(
    'INSERT INTO trip_details (user_id, airport, trip_date) VALUES(?, ?, ?)',
    [userID, airport, date],
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        user: results
      });
    }
  );
});

module.exports = router;
