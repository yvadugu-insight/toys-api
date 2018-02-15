'use strict';

const Category = require('../model/Category');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/categories/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Category
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Category not found!'));
          }
          res(data);
        });
    }
  }
}
