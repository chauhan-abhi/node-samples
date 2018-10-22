const express = require('express') 
const Joi = require('joi')      //returns class
const app = express()

// parse JSON middleware used 
app.use(express.json())

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

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
}) 