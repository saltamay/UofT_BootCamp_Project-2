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

router.put('/users/:id', (req, res) => {
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
    (error, results) => {
      if (error) throw error;

      res.status(200).send(results);
    }
  );
});

router.get('/trips/:userID', (req, res) => {
  const { userID } = req.params;

  connection.query(
    `SELECT * FROM trip_details WHERE user_id = ${userID}`,
    (error, results) => {
      if (error) throw error;

      res.status(200).send({
        success: true,
        trips: results
      });
    }
  );
});

router.put('/trips/:id', (req, res) => {
  const { id } = req.params;
  const newTrip = req.body;

  let query = 'UPDATE trip_details SET ';

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

router.post('/trips', (req, res) => {
  const { userID, airport, date } = req.body;

  connection.query(
    'INSERT INTO trip_details (user_id, airport, trip_date) VALUES(?, ?, ?)',
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

module.exports = router;
