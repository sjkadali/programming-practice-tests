const express = require('express');
const dotenv = require('dotenv');
//const db = require('./dbs/mongo_db');
const fs = require('fs');

dotenv.config();

const test = require('./models/tests.model');


try{
const tests = JSON.parse(fs.readFileSync(`${__dirname}/../_seedInfo/jsTests.json`, 'utf-8'));
console.log(tests);
} catch(err) {
    console.log(err);    
}

