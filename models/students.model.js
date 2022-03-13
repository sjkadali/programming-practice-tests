const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    lname: {type: String},
    fname: {type: String, required: true },
    uname: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now }
});

const StudentInfo = mongoose.model('Students', studentSchema);

module.exports = StudentInfo;