const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const db = require('./database/database');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  db.reset();
  db.init();
}

// Route Files
const users = require('./routes/users');
const trips = require('./routes/trips');
const airports = require('./routes/airports');

const PORT = process.env.PORT || 3000;

const app = express();

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

app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`
  );
});

module.exports = app;
