const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'ugowe',
    password: '',
    database: 'image-recog'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send("It's working!");
})

//signIn --> POST = success/fail
app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt)})

//register --> POST = user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

//profile/:userId --> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleAPIcall(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

