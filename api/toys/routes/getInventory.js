'use strict';

const Toy = require('../model/Toy');
const Boom = require('boom');
const getUserFromToken = require('../../../util/userFunctions').getUserFromToken;

module.exports = {
    method: 'GET',
    path: '/api/toys/inventory',
    config: {
        auth: {
            strategy: 'jwt'
        },
        pre:[{ method:getUserFromToken ,assign:'user' }],
        handler: (req, res) => {
            const {_id:owner} = req.pre.user;
            Toy
            .find({owner})
            // Deselect the password and version fields
            .select('-__v')
            .exec((err, data) => {
                if (err) {
                    res(Boom.badRequest(err));
                }
                if (!data.length) {
                    res(Boom.notFound('No Toys found!'));
                }
                res(data);
            });
        }
    }
}
