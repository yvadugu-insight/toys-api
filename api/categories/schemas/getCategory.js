'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const getCategorySchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = getCategorySchema;
