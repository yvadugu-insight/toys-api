const Boom = require('boom');
const updateToySchema = require('../schemas/updateToy');
const Toy = require('../model/Toy');

module.exports = {
    method: 'PUT',
    path: '/api/toys/{id}',
    config: {
        auth: {
            strategy: 'jwt',
        },
        //need to work on strategy so that owner only can delete toy
        handler: (req, res) => {

        const _id = req.params.id;
        Toy.findByIdAndUpdate({ _id }, { $set: req.payload }, (err, toy) => {
            if (err) res(Boom.badRequest(err));
            if(!toy){
                res(Boom.notFound('Toy not found!'));
            } else {
                // this is still returning old toy, need to work on it
                res({ message:'Toy Updated!', toy});
            }
        });
        },
        // Validate the payload against the Joi schema
        validate: {
            params: updateToySchema
        }
    }
}
