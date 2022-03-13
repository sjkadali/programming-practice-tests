const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const user = require("../_seedInfo/user.json");
//const { validateResetToken } = require('../utils/jwt');

router.get('/', async (req, res) => { 
    const users = await userController.getUsers();
    return res.status(200).json({ users });
}); 

router.get(
    '/seed', async (req, res) => { 
        const createdUser = await userController.createUser(user);
        return res.status(200).json({ createdUser });         
    }
  );

router.get('/profile/:email', async (req, res) => {
    const email = req.params;
    const user = await userController.getUserByQuery(email);
    return res.status(200).json({user});
})

router.post('/',async (req, res) => {
    let body = req.body;
    if (!body.lastName) {
        return res.status(400).json({'message': 'lastname is required'});
    }
    try {
        const result= await userController.createUser(body);  
        return res.status(200).json({ message: "Created User", result: result });
    }   catch(e) {
        return res.status(400).json({error: e });
    }
 });

 router.put('/profile/:email', async (req, res) => {
    const email = req.params.email;
    const userData = req.body.userData;
    try {        
        const result = await userController.updateUser(email, userData);
        if (result) {         
        return res.status(200).json({ result })
        } 
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
});

router.patch('/change-password/:email', async (req, res) => {
    const email = req.params.email;   
    const password = req.body.password;
   
    try {        
        await userController.changePassword(email, password).then(
        (result) => {         
        return res.status(200).json({ message: "Updated Password",  result })
        } ,(e_=> console.log(e)));
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedResult = await userController.deleteUser(id, body); 
        return res.status(200).json({ message: "Deleted User", result: deletedResult  });
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
}); 

module.exports = router;