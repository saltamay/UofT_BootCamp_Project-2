const router = require('express').Router();
const { searchAirports } = require('../controllers/airports');

router.get('/', searchAirports);

module.exports = router;
