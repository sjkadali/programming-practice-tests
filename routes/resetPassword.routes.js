const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const { validateResetToken } = require('../utils/jwt');

router.patch('/', async (req, res) => {
    const email = req.body.resetInfo.email;   
    const password = req.body.resetInfo.password;
    const token = req.body.resetInfo.token;
    if (token) {
        const decodeData = await validateResetToken(token);
        if (decodeData) {
            const { email } = decodeData;        
            try {
                await userController.changePassword(email, password).then(
                    (result) => {         
                    return res.status(200).json({ message: "Updated Password",  result })
                    } ,(e_=> console.log(e)));
            } catch(e) {
                return res.status(400).json({error: e });
            }
        }    
    } else {
        return res.json({error: 'Token not found'});
    }

   /*  try {        
        console.log("in reset-password.routes: ", email, password);
        await userController.changePassword(email, password).then(
        (result) => {         
         console.log("update password result: ", result);
        return res.status(200).json({ message: "Updated Password",  result })
        } ,(e_=> console.log(e)));
    }   catch(e) {
        return res.status(400).json({error: e });
    }     */
});

module.exports = router;