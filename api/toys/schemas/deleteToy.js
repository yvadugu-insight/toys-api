'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteToySchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = deleteToySchema;
