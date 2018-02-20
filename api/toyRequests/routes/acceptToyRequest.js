'use strict';

const ToyRequest = require('../model/ToyRequest');
const Toy = require('../../toys/model/Toy')
const Boom = require('boom');
const sendMessageToUser = require('../../../util/pushNotifications').sendMessageToUser;

module.exports = {
  method: 'GET',
  path: '/api/toy/requests/{id}/accept',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {

      const _id = req.params.id;
        // update Toy and update request
      var toyRequest = ToyRequest
        .findOne({ _id })
        .select('-__v')
        .exec();
      toyRequest
          .then((data) => {
              if (!data) {
                res(Boom.notFound('Request not found!'));
              }
              const { toy, borrower } = data;
              // update Toy
                Toy.findByIdAndUpdate({ _id:toy }, { $set: { status:'borrowed' } }, (err, updatedToy) => {
                    if (err) res(Boom.badRequest(err));
                    if(!updatedToy){
                        res(Boom.notFound('Toy not found!'));
                    } else {
                        // update request
                        ToyRequest.findByIdAndUpdate({ _id }, { $set: { status:'approved' } }, (err, request) => {
                            if (err) res(Boom.badRequest(err));
                            if(!request){
                                res(Boom.notFound('Request not found!'));
                            } else {
                                // update request
                                res({ message:'Request approved!', data:request })
                                // send notification to borrower
                                sendMessageToUser({ user: borrower, message: 'Request approved!' });
                            }
                        });
                    }
                });
          })
          .catch((err)=>{
            res(Boom.badRequest(err));
          })
    }
  }
}
