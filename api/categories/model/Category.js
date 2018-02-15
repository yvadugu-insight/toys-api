'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = new Schema({
  name: { type: String, required: true, index: { unique: true } },
});

module.exports = mongoose.model('Category', categoryModel);
