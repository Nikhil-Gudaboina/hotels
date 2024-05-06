const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.Port || 3000;


const menu = require('./models/menu');

app.get('/', function (req, res) {
  res.send('Welcome to the hotel')
})



const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes)

app.listen(3000,()=>{
    console.log('Listening on 3000')
})