const router = require('express').Router();

const {
  addTripPage,
  getUserTrips,
  updateTrip,
  createTrip,
  deleteTrip
} = require('../controllers/trips.js');

router.get('/', addTripPage);

router.get('/:userId', getUserTrips);

router.put('/:id', updateTrip);

router.post('/', createTrip);

router.delete('/:id', deleteTrip);

module.exports = router;
