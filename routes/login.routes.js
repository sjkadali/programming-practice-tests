const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const userController = require('../controllers/users.controllers');
const {createJWT} = require('../utils/jwt');
require('dotenv').config();

router.post('/', async (req, res) => {
    const body = req.body;  
    try{  
        const user = await userController.getUserByQuery(body);        
         
        // check user password with hashed password stored in the database
        if (user) {
            const match = await bcrypt.compare(body.password, user.password);
            if (match ) {              
                const token = createJWT({role: user.role, 
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                email: user.email});
                token ?  res.status(200).json({ token: token, user: user }) : console.log('No token error'); 
            } else {                   
                return res.status(404).json({error: "Wrong Password/username" });                     
            }                        
        }            
        else {
            return res.status(400).json({errorMessage: "no user" });
        }
    }  catch(e) {
        return res.status(404).json({error: e });
    }    
});

module.exports = router;