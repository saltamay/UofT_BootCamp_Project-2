const connection = require('../config/connection');

const searchAirports = (req, res) => {
  const query = req.query.search;

  connection.query(
    `SELECT * FROM Airport WHERE airportName LIKE '%${query}%'`,
    [query],
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(200).json(results);
    }
  );
};

module.exports = {
  searchAirports
};
