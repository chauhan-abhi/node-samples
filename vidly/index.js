const genres = require('./routes/genres');
const express = require('express');
const app = express();
const mongooose = require('mongoose')

mongooose.connect(('mongodb://localhost/vidly'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB'))


app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));