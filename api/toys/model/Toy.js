'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toyModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
  status: { type: String },
  image: [{ type: String }],
});

module.exports = mongoose.model('Toy', toyModel);
