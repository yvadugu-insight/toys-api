'use strict';

const Joi = require('joi');

const postToyRequestSchema = Joi.object({
    toy: Joi.string().required(),
    message: Joi.string(),
});

module.exports = postToyRequestSchema;
