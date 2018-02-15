const Boom = require('boom');
const deleteToySchema = require('../schemas/deleteToy');
const Toy = require('../model/Toy');

module.exports = {
  method: 'DELETE',
  path: '/api/toys/{id}',
  config: {
    auth: {
      strategy: 'jwt',
    },
    //need to work on strategy so that owner only can delete toy
    handler: (req, res) => {

      const _id = req.params.id;

      Toy
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Toy not found!');
          }

          res({ message: 'Toy deleted!' });
        });

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteToySchema
    }
  }
}
