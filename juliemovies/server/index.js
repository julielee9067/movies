const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all users from the database
app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET: Fetch user by id and password from the database
app.get('/:username/:password', (req, res) => {
  const username = req.params.username;
  const pw = req.params.password;
  db.select('*')
    .from('users')
    .where('username', '=', username).where('password', '=', pw)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST: Create users and add them to the databaseapp.post('/add-user', (req, res) => {
app.post('/add-user', (req, res) => {
  const {username, password} = req.body;
  db('users')
    .insert({
      username: username,
      password: password,
    })
    .then(() => {
      console.log('User Added');
      return res.json({msg: 'User Added'});
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`),
);
