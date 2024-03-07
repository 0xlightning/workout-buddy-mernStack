// libaries 
require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')

// enables json 
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// connection b/w the database
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// rotues
const workoutRoutes = require("./routes/workouts")
app.use('/api/workouts', workoutRoutes)

// defines which path 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})