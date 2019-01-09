require('express-async-errors') // this patches the same work that async.js middleware performs
const winston = require('winston')
require('winston-mongodb')
const error = require('./middleware/error')
const config = require('config')
const Joi = require('joi');
// used for objectId validation
Joi.objectId = require('joi-objectid')(Joi) // returns a function

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

const express = require('express')
const app = express()
const mongooose = require('mongoose')

winston.add(winston.transports.File, { filename: 'logfile.log' })
// logging to mongoDb
winston.add(winston.transports.MongoDB, {
     db: 'mongodb://localhost/vidly',
    level: 'error'  // only error will be logged
})


// pass name of application settings
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}

mongooose.connect(('mongodb://localhost/vidly'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

// special middleware defined after all the 
// routing middlewares so on calling next we come here
app.use(error)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))