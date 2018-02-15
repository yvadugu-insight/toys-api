'use strict';

const Boom = require('boom');
const Toy = require('../model/Toy');
const postToySchema = require('../schemas/postToy');

module.exports = {
  method: 'POST',
  path: '/api/toys',
  config: {
    auth: {
      strategy: 'jwt',
    },
    handler: (req, res) => {
      let toy = new Toy(req.payload);
      toy.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }
        res({ message: 'Toy created!', data }).code(201);
      });

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postToySchema
    }
  }
}
