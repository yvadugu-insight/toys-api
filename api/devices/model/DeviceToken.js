'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicePermissionModel = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String }
});

module.exports = mongoose.model('DevicePermission', devicePermissionModel);
