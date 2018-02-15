'use strict';

const Toy = require('../model/Toy');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/toys/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Toy
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Toy not found!'));
          }
          res(data);
        });
    }
  }
}
