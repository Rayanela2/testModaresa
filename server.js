const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const logLib = require('./lib/log');
const models = require('./models/index');
const AppointmentModel = require('./models/appointment');
const appointmentRoutes = require('./routing/appointment');
const userRoutes = require('./routing/users');
const loginRoutes = require('./routing/login');

const app = express();
const port = 4000;

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Tracks', {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

appointmentRoutes(app);
userRoutes(app);
loginRoutes(app);

app.use('/public', express.static('public', { 'extensions': ['css'] }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
