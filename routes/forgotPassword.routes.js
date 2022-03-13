const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const userController = require('../controllers/users.controllers');
const {createResetToken} = require('../utils/jwt');
const { sendUserMail }= require('../mail');

router.post('/', async (req, res) => {
    const body = req.body;  
    try{  
        const user = await userController.getUserByQuery(body);        
         
        // check for user stored in the database
        if (user) {
            const token = createResetToken({ id: user.id, email:user.email, role: user.role });
            const subject = "Password Reset Link";
            const mailBody = `
                                <div>
                                    <p>Hi! <b>${body.email}</b></p>
                                    <p>Please click on the given link to change your password</p>
                                    <a> ${process.env.CLIENT_URL}/reset-password?email=${user.email}&&token=${token} </a>
                                </div>
                                <div>
                                    <p>Sincerely,</p>
                                    <p>ProgrammingPracticeTests Team</p>
                                </div>`
            const response = await sendUserMail(body.email, subject, mailBody);
            if(response) {
                return res.status(200).json({message: 'Email with change password link has been sent...' });
            }  else return res.status(400).json({errorMessage: error });      
        }            
        else {
            return res.status(400).json({errorMessage: "User does not exist" });
        }
    }  catch(e) {
        return res.status(400).json({error: e });
    }    
});

module.exports = router;