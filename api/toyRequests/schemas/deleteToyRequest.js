'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteToyRequestSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = deleteToyRequestSchema;
