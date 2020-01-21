const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    searchUsers,
    createUser,
    updateUser,
    deleteUser
  } = require('../controllers/users.js')

router.get('/', (req, res) => {
    res.render('view-profile');
    });
router.get('/:userId', getSingleUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
