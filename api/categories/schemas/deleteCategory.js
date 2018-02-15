'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteCategorySchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = deleteCategorySchema;
