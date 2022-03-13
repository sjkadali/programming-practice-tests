const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
var cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname,"angular-client", "build")));

const fs = require('fs');

const excelToJson = require('convert-excel-to-json');

const { validateJWT } = require('./utils/jwt');
app.use(express.json());

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(400).json({ message: 'Token Not found..' });
  }
  const result = await validateJWT(token);  
  next();
}

app.use('/secure', validateToken);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//const students = require('./routes/students.routes');
const users = require('./routes/users.routes');
const tests = require('./routes/tests.routes');
const login = require('./routes/login.routes');
const signup = require('./routes/signup.routes');
const forgotPassword = require('./routes/forgotPassword.routes');
const resetPassword = require('./routes/resetPassword.routes');

//app.use('/students',  students);
app.use('/secure/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/forgotPassword', forgotPassword);
app.use('/resetPassword', resetPassword);
app.use('/secure/tests', tests);

require('./dbs/mongo_db');

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "angular-client", "build", "index.html"));
});

app.listen(process.env.PORT || 8000, ()=> console.log('Server started on port 3000'));