const express = require('express') 
const app = express()
const logger = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')    // logging function
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const courses = require('./routes/courses')
const home = require('./routes/home')




// console.log(`NODE_ENV: ${process.env.NODE_ENV}`) // return undefined by default
// console.log(app.get('env')) // return development by default

app.set('view engine', 'pug')
app.set('views', './views') //default

// parse JSON middleware used 
// express.json() -> read the req , find the JSON object in req and
// set it in req.body
app.use(express.json())
// parses incoming r eq with url-encoded payloads
//key=value&key=value
app.use(express.urlencoded({extended: true}))
//static assets images,css
app.use(express.static('public'))
app.use(helmet())


// tell express if any API starts with this route use 
// this courses router loaded
app.use('/api/courses', courses)
app.use('/', home)

// console.log('Application Name: ' + config.get("name"))
// console.log('Mail Server: '+ config.get('mail.host'))

/**********read password from env variable not config file************/
console.log('Mail Password: '+ config.get('mail.password'))

if(app.get('env') === 'development') {
    app.use(morgan('tiny')) 
    startupDebugger('Morgan enabled....')
  
}

// middleware ...here next: ref to next middleware function
// called in sequence Logging-> Authenticating-> Route Handler

// app.use(function(req, res, next) {
//     console.log('Logging ...')
//     next()
// })
/********Alter ***********/
app.use(logger)

app.use(function(req, res, next) {
    console.log('Authenticating ...')
    next()
})

//cli for this namespace shorcut to run
/****DEBUG=app:db nodemon app.js*****/
dbDebugger('Connected to databas...')

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
}) 