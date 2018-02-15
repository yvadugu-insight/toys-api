'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toyModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  status: { type: String },
  image: [{ type: String }],
  borrower:{ type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Toy', toyModel);
