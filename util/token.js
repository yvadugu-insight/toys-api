'use strict';

const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const createGravatarUrl = require('./createGravatar');

function createToken(user) {
  let scope;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scope = 'admin';
  }

  // Sign the JWT
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: 'admin',
      gravatar: createGravatarUrl(user.email),
      scope
    },
    secret,
    {
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  );
}
function getToken(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
function getTokenPayLoad(req){
    const jwtToken = getToken(req);
    if(jwtToken){
        try {
            return jwt.verify(jwtToken, secret);
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = {
    createToken:createToken,
    getToken:getToken,
    getTokenPayLoad:getTokenPayLoad,
};
