const express = require('express');
tests = require('../_seedInfo/jsTests.json');
//const JSTests = require('../models/tests.model');
//const HTMLTests = require('../models/tests.model');
//const CSSTestData = require('../models/tests.model');
const testController = require('../controllers/test.controller');
const router = express.Router();


router.get(
    '/seed', async (req, res) => {    
        const createdTests = await testController.createTests(tests);
        res.send({ createdTests });            
    }
  );  

router.get('/:test', async (req, res) => { 
    try{
        const tests = await testController.getTests(req.params.test);
        return res.status(200).json({ tests });
    } catch(err) {
        return err;
    }
    
        
}); 

module.exports = router;