const Joi = require('joi');
// used for objectId validation
Joi.objectId = require('joi-objectid')(Joi) // returns a function

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')

const express = require('express')
const app = express()
const mongooose = require('mongoose')

mongooose.connect(('mongodb://localhost/vidly'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))