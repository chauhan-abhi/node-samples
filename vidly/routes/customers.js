const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
      type: Boolean,
      default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Customer = mongoose.model('Customer', customerSchema)

router.get('/', async(req, res) => {
  const customer = await Customer
      .find()
      .sort('name')
  res.send(customer);
});

router.post('/', async(req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    })
  customer = await customer.save()
  res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

module.exports = router