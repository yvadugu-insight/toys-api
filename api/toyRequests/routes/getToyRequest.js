'use strict';

const ToyRequest = require('../model/ToyRequest');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/toy/requests/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;

      var toyRequest = ToyRequest
        .findOne({ _id })
        .populate({
          path: 'owner',
          select: '-password -admin -__v',
        })
        .populate({
          path: 'borrower',
          select: '-password -admin -__v',
        })
        .populate('toy')
        .select('-__v')
        .exec();
      toyRequest
          .then((data) => {
              if (!data) {
                res(Boom.notFound('Request not found!'));
              }
              res(data);
          })
          .catch((err)=>{
            res(Boom.badRequest(err));
          })
    }
  }
}
