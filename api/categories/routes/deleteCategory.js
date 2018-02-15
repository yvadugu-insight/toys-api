'use strict';

const Boom = require('boom');
const Category = require('../model/Category');
const deleteCategorySchema = require('../schemas/deleteCategory');

module.exports = {
  method: 'DELETE',
  path: '/api/categories/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Category
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Category not found!');
          }

          res({ message: 'Category deleted!' });
        });

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteCategorySchema
    }
  }
}
