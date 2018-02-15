'use strict';

const Boom = require('boom');
const Toy = require('../model/Toy');
const postToySchema = require('../schemas/postToy');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;

module.exports = {
  method: 'POST',
  path: '/api/toys',
  config: {
    auth: {
      strategy: 'jwt',
    },
    pre:[
        { method:getUserFromToken, assign:'user' }
    ],
    handler: (req, res) => {
      const { _id:owner } = req.pre.user;
      let toy = new Toy(req.payload);
      toy.owner = owner;
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
