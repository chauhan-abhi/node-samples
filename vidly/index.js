const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))