'use strict';

const Boom = require('boom');
const DeviceToken = require('../model/DeviceToken');
const postDeviceToken = require('../schemas/postDeviceToken');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;

module.exports = {
  method: 'GET',
  path: '/api/device/tokens',
  config: {
    auth: {
      strategy: 'jwt',
    },
    pre:[
        { method:getUserFromToken, assign:'user' }
    ],
    handler: (req, res) => {
      const { _id:user } = req.pre.user;
      // fetch toy details
      DeviceToken
        .find({ user })
        .select('-__v -user')
        .exec((err, data)=>{
          if(err){
            res(Boom.notFound('Token not found!'))
          }
          res(data);
        })


    }
  }
}
