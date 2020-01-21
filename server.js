const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const { Strategy } = require('passport-local');

const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const db = require('./database/database');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  db.reset();
  db.init();
}

const dbLogin = require('./models/login');

// Route Files
const users = require('./routes/users');
const trips = require('./routes/trips');
const airports = require('./routes/airports');
const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');

const PORT = process.env.PORT || 3000;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy((username, password, cb) => {
    dbLogin.findByUsername(username, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password !== password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  dbLogin.login.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

const app = express();

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Mount routers
app.use('/users', users);
app.use('/trips', trips);
app.use('/airports', airports);
app.use('/login', login);
app.use('/signup', signup);
app.use('/profile', profile);

app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`
  );
});

module.exports = app;
