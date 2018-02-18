const Boom = require('boom');
const updateToyRequestSchema = require('../schemas/updateToyRequest');
const ToyRequest = require('../model/ToyRequest');

module.exports = {
    method: 'PUT',
    path: '/api/toy/requests/{id}',
    config: {
        auth: {
            strategy: 'jwt',
        },
        //need to work on strategy so that owner only can delete toy
        handler: (req, res) => {

        const _id = req.params.id;
        ToyRequest.findByIdAndUpdate({ _id }, { $set: req.payload }, (err, request) => {
            if (err) res(Boom.badRequest(err));
            if(!request){
                res(Boom.notFound('Request not found!'));
            } else {
                // this is still returning old toy, need to work on it
                res({ message:'Request Updated!', request});
            }
        });
        },
        // Validate the payload against the Joi schema
        validate: {
            params: updateToyRequestSchema
        }
    }
}
