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

      var toy = Toy
        .findOne({ _id })
        .populate({
          path: 'owner',
          select: '-password -__v',
        })
        .populate('categories')
        .select('-__v')
        .exec();
        toy
          .then((data) => {
              if (!data) {
                res(Boom.notFound('Toy not found!'));
              }
              res(data);
          })
          .catch((err)=>{
            res(Boom.badRequest(err));
          })
    }
  }
}
