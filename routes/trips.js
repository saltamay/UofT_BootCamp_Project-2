const router = require('express').Router();
const {
  getUserTrips,
  updateTrip,
  createTrip,
  deleteTrip
} = require('../controllers/trips.js');

router.get('/:userId', getUserTrips);

router.put('/:id', updateTrip);

router.post('/', createTrip);

router.delete('/:id', deleteTrip);

module.exports = router;
