'use strict';

const Joi = require('joi');

const getToyRequestSchema = Joi.object({
  token: Joi.string()
});

module.exports = getToyRequestSchema;
