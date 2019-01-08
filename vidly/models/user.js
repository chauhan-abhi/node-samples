const Joi = require('joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
})

userSchema.methods.generateAuthToken = function () {
  // we need user._id
  //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'))
  
  // payload, secret key
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
  return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),// plain text password
  };

  return Joi.validate(user, schema);
}

module.exports.User = User
module.exports.validate = validateUser