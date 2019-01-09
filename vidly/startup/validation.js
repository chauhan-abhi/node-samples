const Joi = require('joi');

module.exports = function() {
// used for objectId validation
Joi.objectId = require('joi-objectid')(Joi) // returns a function

}