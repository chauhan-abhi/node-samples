const {Movie, validate} = require('../models/movie')
const {Genre} = require('../models/genre')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const movies= await Movie.find().sort('title')
    res.send(movies)
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message)
    
    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre.')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        numberRentalRate: rqe.body.numberRentalRate
    })

    movie = await movie.save()
    res.send(movie)
})

router.put('/', async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre.')

    const movie = await Movie.findByIdAndUpdate(req.params.id,
    {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        numberRentalRate : req.body.numberRentalRate
    }, {new: true})

    if(!movie) return res.send(404).send('The movie with given Id was not found')
    res.send(movie)
})

module.exports = router; 