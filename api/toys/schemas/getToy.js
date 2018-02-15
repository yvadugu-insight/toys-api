'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const getToySchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = getToySchema;
