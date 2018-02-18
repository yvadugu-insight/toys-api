const Boom = require('boom');
const deleteToyRequestSchema = require('../schemas/deleteToyRequest');
const ToyRequest = require('../model/ToyRequest');

module.exports = {
  method: 'DELETE',
  path: '/api/toy/requests/{id}',
  config: {
    auth: {
      strategy: 'jwt',
    },
    //need to work on strategy so that owner only can delete toy
    handler: (req, res) => {

      const _id = req.params.id;
      ToyRequest
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Your request not found!');
          }
          res({ message: 'Request deleted!' });
        });
    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteToyRequestSchema
    }
  }
}
