const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controllers');

router.get('/', async (req, res) => { 
    const students = await studentController.getStudents();
    return res.status(200).json({ students });
}); 

router.post('/',async (req, res) => {
    let body = req.body;
    if (!body.lname) {
        return res.status(400).json({'message': 'lastname is required'});
    }
    try {
        const result= await studentController.createStudent(body);  
        return res.status(200).json({ message: "Created Student", result: result });
    }   catch(e) {
        return res.status(400).json({error: e });
    }
 });

router.patch('/:id', async (req, res) => {
    const id = req.params.id;   
    const body = req.body;
    try {
        const result = await studentController.updateStudent(id, body); 
        return res.status(200).json({ message: "Updated Student", result: result });
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id: ', id);
    try {
        const deletedResult = await studentController.deleteStudent(id, body); 
        return res.status(200).json({ message: "Deleted Student", result: deletedResult  });
    }   catch(e) {
        return res.status(400).json({error: e });
    }    
}); 

module.exports = router;