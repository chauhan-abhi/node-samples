const winston = require('winston')
const mongooose = require('mongoose')

module.exports = function() {
    mongooose.connect(('mongodb://localhost/vidly'), { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB'))
    // The below work is done by winston in index.js
    //.catch(err => console.log('Could not connect to MongoDB'))
}