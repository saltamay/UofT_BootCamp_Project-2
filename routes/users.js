const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  searchUsers,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getSingleUser);

router.post('/search', searchUsers);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
