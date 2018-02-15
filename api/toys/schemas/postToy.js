'use strict';

const Joi = require('joi');

const postToySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categories: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
  status: Joi.string(),
});

module.exports = postToySchema;
