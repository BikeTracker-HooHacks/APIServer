const express = require('express');
const session = require('express-session');
const gpsRoutes = require('./routes/gps');
const userRoutes = require('./routes/user');
const trackerRoutes = require('./routes/tracker');
require('dotenv').config();
const db = require('./db');

db.connect();

const app = express();
const port = process.env.PORT;
const sessionSecret = process.env.SESSIONSECRET;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'strict' },
}));

app.use('/gps', gpsRoutes);
app.use('/user', userRoutes);
app.use('/tracker', trackerRoutes);

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})

// db.createUser("test@test.com", "Jason", "testPassword");
// db.signIn("test@test.com", "testPassword");
// db.signIn("test@test.com", "testPasswordBad");
// db.signIn("test@test.comBAD", "testPassword");


process.on('SIGINT', () => {
  console.log("Shutting down...");
  db.close();
  server.close();
})