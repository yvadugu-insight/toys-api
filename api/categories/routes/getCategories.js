'use strict';

const Category = require('../model/Category');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/categories',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      Category
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No categories found!');
          }
          res(data);
        });
    }
  }
}
