'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateToyRequestSchema = Joi.object({
    id: Joi.objectId().required()
});

module.exports = updateToyRequestSchema;
