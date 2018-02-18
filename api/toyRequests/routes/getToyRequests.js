'use strict';

const ToyRequest = require('../model/ToyRequest');
const Boom = require('boom');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;

module.exports = {
  method: 'GET',
  path: '/api/toy/requests',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      ToyRequest
        .find()
        .populate({
          path: 'owner',
          select: '-password -admin -__v',
        })
        .populate({
          path: 'borrower',
          select: '-password -admin -__v',
        })
        .populate('toy')
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No Requests found!');
          }

          res(data);
        });
    }
  }
}
