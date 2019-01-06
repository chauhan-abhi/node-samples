const mongoose = require('mongoose')
const Joi = require('joi')
const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
   title: {
       type: String,
        required : true,
        trim : true,
        minlength: 5,
        maxlength: 255
    },
   genre: {
       // here reusing the genre Schema defined in Genre module
       // so we get hands on all the genre properties defined
        type: genreSchema,
        required: true
   },
   numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
   },
   dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
   }  
})
const Movie = mongoose.model('Movies', movieSchema)

// what client sends us= Joi schema
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(movie, schema)
}

module.exports.Movie = Movie
module.exports.validate = validateMovie