const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require("bcrypt")

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
      return res.status(400).send({
        msg: err
      })
    });
});

app.get('/get-favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  db.select('movie_id', 'movie_title')
    .from('user_movies')
    .where('user_id', '=', userId)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        msg: err
      })
    });
});

// GET: Fetch user by id and password from the database
app.get('/:username/:password', (req, res) => {
  const username = req.params.username;
  const pw = req.params.password;
  db.select('salt').from('users').where('username', '=', username).first().then((data) => {
    bcrypt.hash(pw, data.salt, function (err, hash) {
      db.select('*')
        .from('users')
        .where('username', '=', username).where('password', '=', hash)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
});

// POST: Create users and add them to the databaseapp.post('/add-user', (req, res) => {
app.post('/add-user', (req, res) => {
  const {username, password} = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, function (err, hash) {
      db('users')
        .insert({
          username: username,
          password: hash,
          salt: salt
        })
        .then(() => {
          console.log('User Added');
          return res.json({msg: 'User Added'});
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send({
            msg: err
          })
        });
    });
  })
});

app.post('/add-favorite', (req, res) => {
  const {userId, movieId, movieTitle} = req.body;
  console.log(req.body);

  db('user_movies')
    .insert({
      user_id: userId,
      movie_id: movieId,
      movie_title: movieTitle,
    })
    .then(() => {
      console.log('Favorite movie Added');
      return res.json({msg: 'Favorite movie Added'});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        msg: err
      })
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`),
);
