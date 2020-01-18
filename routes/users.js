const router = require('express').Router();
const connection = require('../config/connection');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM User', (error, results) => {
    if (error) throw error;

    res.status(200).send({
      success: true,
      users: results
    });
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        user: results
      });
    }
  );
});

router.post('/', (req, res) => {
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
      (firstName, lastName, birthdate, gender, email, relationshipStatus, height, hairColour, tagline, bio, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;

  let query = 'UPDATE users_details SET ';

  Object.keys(updatedInfo).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(updatedInfo, key)) {
      let value = updatedInfo[key];
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' || value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      query += `${key}=${value}`;
    }
  });

  query += ` WHERE id=${id}`;
  console.log(query);
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM User WHERE id = ${id}`;

  connection.query(query, error => {
    if (error) throw error;

    res.status(200).send({
      deleted: true
    });
  });
});

module.exports = router;
