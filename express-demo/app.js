const express = require('express') 
const Joi = require('joi')      //returns class
const app = express()
const logger = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan')    // logging function
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')



console.log(`NODE_ENV: ${process.env.NODE_ENV}`) // return undefined by default
console.log(app.get('env')) // return development by default

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

console.log('Application Name: ' + config.get("name"))
console.log('Mail Server: '+ config.get('mail.host'))

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

const courses = [
    {id: 1, name: 'DS'},
    {id: 2, name: 'DAA'},
    {id: 3, name: 'OS'}
]


app.get('/', (req, res) => {
    res.send('Express response')    
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// /api/courses/1/
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(course) {
        res.send(course)
    } else {
        return res.status(400).send('The course with ID not available')
    } 

})

/*******http://localhost:3000/api/courses/2018/1?sort=name *********/
app.get('/api/courses/:yyyy/:mm', (req, res) =>{
    res.send(req.query)
})


app.post('/api/courses', (req, res) => {
    //OBJECT DESTRUCTURING
    const {error} = validateCourse(req.body)    //result.error 
    if(error) {
       return  res.status(400).send(error.details[0].message)
    }

    const course = {
        // db assigns id normally
        id: courses.length +1, 
        // to enable parsing of body write app.use(express.json()) middleware
        name: req.body.name,
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) {
        return res.status(400).send('The course with ID not available')
    }
    //const result = validateCourse(req.body)
    const {error} = validateCourse(req.body)    //result.error OBJECT DESTRUCTURING

    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    //update course
    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) {
        return res.status(400).send('The course with ID not available')
    }
    const index = courses.indexOf(course)
    courses.splice(index,1)  //remove course from courses array
    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

//cli for this namespace shorcut to run
/****DEBUG=app:db nodemon app.js*****/
dbDebugger('Connected to databas...')

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
}) 