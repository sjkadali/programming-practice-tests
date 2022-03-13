const { response } = require('express');
const Users = require('../models/users.model');
const bcrypt = require("bcrypt");

async function createUser(body) {
    const user = new Users(body);
    const password = user.password;
    console.log("createUser: ", user, password);
    try {
        // now we set user password to hashed password        
        user.password = await hashPassword(password);
        const result = await user.save();
           if (result) {
                console.log("User Created: ",result);
                return result;
            }
    } catch(e) { console.log("Create User Error: ", e);}
}

async function createUsers(users) {
    console.log("users: ", users);
    const createdUsers = await Users.insertMany(users);
    console.log(createdUsers);
    res.send({ createdUsers });   
}

async function changePassword(email,password) {
    console.log("email, password: ", email, password);
    const hPassword = await hashPassword(password);
    console.log("hPassword: ", hPassword);
    try{
        const result = await Users.findOneAndUpdate (
                            { email }, 
                            { $set:  {password: hPassword }},
                            { new: true}
                        );
        if (result) {
                return result;
        }
    } catch(e) {
        console.log(e);
    }      
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function getUsers() {
    const users = await Users.find();
    return users;
}

async function updateUser(email, updateData) {    
    try {
        const result = await Users.findOneAndUpdate (
            { email },
            { $set: { 
                firstName: updateData.firstName, 
                lastName: updateData.lastName,
                email: updateData.email,
                role: updateData.role
            }}, { new: true}
        )
        if (result) {
            return result;
        }
    } catch(e) {
        console.log(e);        
    }   
}

async function deleteUser(id) {
    Users.findByIdAndDelete(id)
        .then(result => {
            return result;
        }).catch(e => {
            console.log(e);
        throw new Error(e);
    });        
}

async function getUserByQuery(query) {
   const user= await Users.findOne({ email: query.email })
    if(user) {        
        return user;
    } else {
    }
}

module.exports = {
    createUser, 
    createUsers,
    getUsers,    
    updateUser,
    changePassword,
    deleteUser,
    getUserByQuery
};