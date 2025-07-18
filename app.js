const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();

const session = require('express-session');

app.use(
  session({
    secret: 'mock-secret', // replace with env variable in real login
    resave: false,
    saveUninitialized: false,
  })
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
const journalRoutes = require('./jOURNAL/routes/journal');
app.use('/journals', journalRoutes);

// Database connection
// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB connection error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
