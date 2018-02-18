'use strict';

const ToyRequest = require('../model/ToyRequest');
const Toy = require('../../toys/model/Toy')
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/toy/requests/{id}/reject',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;
        // update Toy and update request
        ToyRequest.findByIdAndUpdate({ _id }, { $set: { status:'rejected' } }, (err, request) => {
            if (err) res(Boom.badRequest(err));
            if(!request){
                res(Boom.notFound('Request not found!'));
            } else {
                // update request
                res({ message:'Request approved!', data:request })
                // @todo send notification to borrower
            }
        });
    }
  }
}
