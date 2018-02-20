'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  first_name: { type: String },
  last_name: { type: String },

});

module.exports = mongoose.model('User', userModel);
