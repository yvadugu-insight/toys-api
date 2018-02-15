'use strict';

const Joi = require('joi');

const postCategorySchema = Joi.object({
  name: Joi.string().required()
});

module.exports = postCategorySchema;
