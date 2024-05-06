const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
const mongoURL = process.env.DB_URL;
//const mongoURL ='mongodb+srv://nikhilgudaboina:<Nikhil14>@cluster0.w9q2xlw.mongodb.net/'

//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',()=>{
    console.log('MongoDB connection error:', error);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export the database connection
module.exports = db;
