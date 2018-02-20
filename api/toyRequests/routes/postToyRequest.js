'use strict';

const Boom = require('boom');
const ToyRequest = require('../model/ToyRequest');
const Toy = require('../../toys/model/Toy')
const postToyRequest = require('../schemas/postToyRequest');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;
const sendMessageToUser = require('../../../util/pushNotifications').sendMessageToUser;

module.exports = {
  method: 'POST',
  path: '/api/toy/requests',
  config: {
    auth: {
      strategy: 'jwt',
    },
    pre:[
        { method:getUserFromToken, assign:'user' }
    ],
    handler: (req, res) => {
      const { _id:borrower, username } = req.pre.user;
      // fetch toy details
      var toy = Toy
                  .findOne({ _id:req.payload.toy })
                  .select('-__v')
                  .exec();
      toy.then((data)=>{
        if(!data) res(Boom.notFound('Toy not found!'));
        const { owner, title } = data;
        let toyRequest = new ToyRequest(req.payload);
        toyRequest.borrower = borrower;
        toyRequest.owner = owner;
        toyRequest.status = 'open';
        toyRequest.save((err, data) => {
            if (err) {
                res(Boom.badRequest(err));
                return;
            }
            const message = `${username} requested ${title}`;
            // console.log(message, 'message');
            sendMessageToUser({ user: owner, message });

            res({ message: 'Sent request to owner!', data }).code(201);
        });
      }).catch((err)=>{
        res(Boom.notFound('Toy not found!'));
      });
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postToyRequest
    }
  }
}
