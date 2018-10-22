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
    res.send([1,2,3])
})

// /api/courses/1/
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(course) {
        res.send(course)
    } else {
        res.status(400).send('The course with ID not available')
    } 

})

/*******http://localhost:3000/api/courses/2018/1?sort=name *********/
app.get('/api/courses/:yyyy/:mm', (req, res) =>{
    res.send(req.query)
})


app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length <3) {
        res.status(400).send('Name is req and should be min 3 chars')
        return
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

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
}) 