const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionsSchema = new Schema({
    text: {type: String, required: true},
    correct: {type: Boolean, required: true}
});

const testSchema = new Schema({
    question: {type: String},
    options: [optionsSchema]
});

const JSTestData = mongoose.model('JSTests', testSchema);
const HTMLTestData = mongoose.model('HTMLTests', testSchema);
const CSSTestData = mongoose.model('CSSTests', testSchema);

module.exports = {
    JSTestData,
    HTMLTestData,
    CSSTestData
};