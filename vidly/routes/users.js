const _ = require('lodash')
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const {User, validate} = require('../models/user')
const auth = require('../middleware/auth')


router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})


router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // not already registered
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already registerd')

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    user = new User(_.pick(req.body, ['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    // efficient object accessing using lodash
    
    // payload, secret key
    const token = user.generateAuthToken()

    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))
});

module.exports = router