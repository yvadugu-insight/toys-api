'use strict';

const Boom = require('boom');
const DeviceToken = require('../model/DeviceToken');
const postDeviceToken = require('../schemas/postDeviceToken');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;

module.exports = {
  method: 'POST',
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
      var dToken = new DeviceToken(req.payload)
      dToken.user = user;
      dToken.save((err, data)=>{
        if(err){
          res(Boom.badRequest(err));
        }
        res({ message: 'Device token saved!', data });
      })

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postDeviceToken
    }
  }
}
