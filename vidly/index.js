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
const mongooose = require('mongoose')
const app = express()

//---------------------------------------------------------//

// standard event --> raised in node process and not handled 
// using catch block
// this is neccesary because our error.js does not handle 
// exceptions which are outside context of express
/* *** but this works only with synchronous code
 and not on promise rejections(UNHANDLED PROMISE REJECTIONS) ******/
//---------------------------------------------------------//
/* process.on('uncaughtException', (ex) => {
     //console.log('WE GOT AN UNCAUGHT EXCPETION')
     winston.error(ex.message, ex)
     process.exit(1)
})
*/
/***********OR **************/
// handle uncaughtExceptions and log them to File  
winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }))

//---------------------------------------------------------//
// promise rejections(UNHANDLED PROMISE REJECTIONS)
/* process.on('unhandledRejection', (ex) => {
    // console.log('WE GOT AN UNHANDLED REJECTION')
    winston.error(ex.message, ex)
    process.exit(1)
}) */
/*******OR **********/
process.on('unhandledRejection', (ex) => {
    // winston will automatically catch this even after 
    // it doesnt supoort unhandledRejection by default
    throw ex
})
//---------------------------------------------------------//

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