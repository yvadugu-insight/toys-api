'use strict';

const Toy = require('../model/Toy');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/toys',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      Toy
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No Toys found!');
          }

          res(data);
        });
    }
  }
}
