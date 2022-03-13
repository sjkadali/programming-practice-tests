const jwt = require('jsonwebtoken');
require('dotenv').config();

function createJWT(encodeData) {
    const token = jwt.sign(encodeData, process.env.JWT_AC_ACTIVATE, {'expiresIn': '15m'});
    return token; 
}

function validateJWT(token) {
    let data;
    jwt.verify(token, process.env.JWT_AC_ACTIVATE, function(err, decodeData) {
        if (err) {
            return err;
        } else {
           data =  decodeData;
        }  
    });
    return data;
}

function createResetToken(encodeData) {
    const token = jwt.sign(encodeData, process.env.JWT_PWD_RESET, {'expiresIn': '1m'});
    return token; 
}

function validateResetToken(token) {
    let data;
    jwt.verify(token, process.env.JWT_PWD_RESET, function(err, decodeData) {
        if (err) {
            return err;
        } else {
           data =  decodeData;
        }  
    });
    return data;
}

module.exports = {
    createJWT,
    validateJWT,
    createResetToken,
    validateResetToken
}