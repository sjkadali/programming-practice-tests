const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const { sendUserMail }= require('../mail');
const { createJWT, validateJWT } = require('../utils/jwt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/',async (req, res) => {
    let userData = req.body;
    if (!(userData.email && userData.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    const token = createJWT({firstName: userData.firstName, 
                            lastName: userData.lastName,
                            email: userData.email,
                            password: userData.password,
                            role: userData.role }); 
    const subject = "Welcome to ProgrammingPracticeTests";
    const mailBody = `
                        <div>
                            <p>Hi! <b>${userData.email}</b></p>
                            <p>Click on the given link to activate the account</p>
                            <a> ${process.env.CLIENT_URL}/activate-account?token=${token} </a>
                        </div>
                        <div>
                            <p>Sincerely,</p>
                            <p>ProgrammingPracticeTests Team</p>
                        </div>   
                   `
    try{ 
        const response = await sendUserMail(userData.email, subject, mailBody);
        if (response) {
           
        }  
    } catch(e) {
        console.log("Error sending mail:  ", e);
    }     
   
});

router.post('/activateAccount', async (req,res) => {
    const token = req.body.token;

    if (token) {
        const decodeData = await validateJWT(token);

        if (decodeData) {
        const { email, firstName, lastName, password } = decodeData;
        
        try {
            const user = await userController.getUserByQuery(email);             
            if (!user) {
                const result= await userController.createUser(decodeData);                
                if (result) {
                    return res.status(200).json({ message: "Signup success!", result: result });
                }
            } else {
                return res.status(400).json({message: 'User with this email already exists'})
            }
        } catch(e) {
            return res.status(400).json({error: e });
        }
          }      // return res.json({message: 'Account activated'});
    } else {
        return res.json({error: 'Something went wrong!!!'});
    }
});

module.exports = router;