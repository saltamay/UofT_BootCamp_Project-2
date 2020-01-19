const connection = require('../config/connection');

/**
 * @description Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM User', (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false
      });
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

/**
 * @description Get single user
 * @route GET /users/:id
 * @access Private
 */
const getSingleUser = (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(200).send({
        success: true,
        data: result
      });
    }
  );
};

/**
 * @description Search users
 * @route GET /users/search
 * @access Private
 */
const searchUsers = (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'airport')) {
    const { airport, tripDate, timeSlot } = req.body;

    const airportName = airport.split(', ')[0];

    console.log(airportName, tripDate, timeSlot);

    const query = `SELECT * FROM User JOIN Trip ON User.id = Trip.userId WHERE Trip.airport = '${airportName}' AND Trip.tripDate = '${tripDate}'`;

    connection.query(query, (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  }
};

/**
 * @description Create a user
 * @route POST /users
 * @access Public
 */
const createUser = (req, res) => {
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
    (error, result) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(201).json({
        success: true,
        data: {
          id: result.insertId,
          ...req.body
        }
      });
    }
  );
};

/**
 * @description Update user
 * @route DELETE /users/:id
 * @access Private
 */
const updateUser = (req, res) => {
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

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false
      });
    }
    if (results.affectedRows === 0) {
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).json({
        success: false
      });
    }
    return res.status(200).json({
      success: true
    });
  });
};

/**
 * @description Delete a user
 * @route DELETE /users/:id
 * @access Private
 */
const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM User WHERE id = ${id}`;

  connection.query(query, error => {
    if (error) {
      return res.status(400).json({
        success: false
      });
    }
    return res.status(200).send({
      success: true
    });
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  searchUsers,
  createUser,
  updateUser,
  deleteUser
};
