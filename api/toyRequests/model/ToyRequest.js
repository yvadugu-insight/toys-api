'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toyRequestModel = new Schema({
    toy: { type: Schema.Types.ObjectId, ref: 'Toy', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String },
    borrower:{ type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
});

module.exports = mongoose.model('ToyRequest', toyRequestModel);
