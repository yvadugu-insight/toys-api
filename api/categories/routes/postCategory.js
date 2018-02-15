'use strict';

const Boom = require('boom');
const Category = require('../model/Category');
const postCategorySchema = require('../schemas/postCategory');

module.exports = {
  method: 'POST',
  path: '/api/categories',
  config: {
    auth: {
      strategy: 'jwt',
    },
    handler: (req, res) => {

      let category = new Category(req.payload);

      category.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Category created!', data }).code(201);
      });

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postCategorySchema
    }
  }
}
