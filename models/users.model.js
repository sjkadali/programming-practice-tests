const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: {type: String},
    firstName: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    role: { type: String, default: 'member'},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now }
});

const UserInfo = mongoose.model('Users', userSchema, 'Users');

module.exports = UserInfo;