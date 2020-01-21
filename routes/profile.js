const router = require('express').Router();

const {
  getSingleUser,
  updateUser,
  deleteUser
} = require('../controllers/users.js');

router.get('/user/:id', getSingleUser);

router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);

module.exports = router;
