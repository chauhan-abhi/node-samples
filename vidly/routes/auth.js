const _ = require('lodash')
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const {User} = require('../models/user')
const Joi = require('joi');


router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // not already registered
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')
    const token = user.generateAuthToken()
    res.send(token)
});
 
function validate(req) { 
    const schema = {
      email: Joi.string().min(3).max(255).required().email(),
      password: Joi.string().min(3).max(255).required(),// plain text password
    }; 
  
    return Joi.validate(req, schema);
}

module.exports = router