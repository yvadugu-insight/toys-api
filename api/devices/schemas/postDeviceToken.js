'use strict';

const Joi = require('joi');

const postDeviceTokenSchema = Joi.object({
    token: Joi.string().required()
});

module.exports = postDeviceTokenSchema;
