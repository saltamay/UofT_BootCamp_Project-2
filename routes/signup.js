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
  res.render('signup');
});

router.post('/signup', createUser, 
(req, res) => {
  console.log("User Added");
  res.redirect('/');
});


module.exports = router;
