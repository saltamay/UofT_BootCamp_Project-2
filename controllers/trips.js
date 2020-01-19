const connection = require('../config/connection');

/**
 * @description Get all upcoming trips of a user
 * @route GET /trips/:userId
 * @access Private
 */
const getUserTrips = (req, res) => {
  const { userId } = req.params;

  connection.query(
    `SELECT * FROM Trip WHERE Trip.userId = ${userId}`,
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(200).json({
        success: true,
        trips: results
      });
    }
  );
};

/**
 * @description Update trip
 * @route PUT /trips/:id
 * @access Private
 */
const updateTrip = (req, res) => {
  const { id } = req.params;
  const newTrip = req.body;

  let query = 'UPDATE Trip SET ';

  Object.keys(newTrip).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(newTrip, key)) {
      let value = newTrip[key];
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' || value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      query += `${key}=${value}`;
    }
  });

  query += ` WHERE id=${id}`;

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false
      });
    }
    if (results.affectedRows === 0) {
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    }
    return res.status(200).json({
      success: true
    });
  });
};

/**
 * @description Create a trip
 * @route POST /trips
 * @access Private
 */
const createTrip = (req, res) => {
  const { userId, airport, date } = req.body;

  connection.query(
    'INSERT INTO Trip (userId, airport, tripDate) VALUES(?, ?, ?)',
    [userId, airport, date],
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(200).json({
        success: true,
        data: {
          id: results.insertId,
          ...req.body
        }
      });
    }
  );
};

/**
 * @description Delete a trip
 * @route DELETE /trips/:id
 * @access Private
 */
const deleteTrip = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM Trip WHERE id = ${id}`;

  connection.query(query, error => {
    if (error) {
      return res.status(400).json({
        success: false
      });
    }
    return res.status(200).json({
      success: true
    });
  });
};

module.exports = {
  getUserTrips,
  createTrip,
  updateTrip,
  deleteTrip
};
