const { JSTestData, HTMLTestData, CSSTestData } = require('../models/tests.model');

async function getTests(test) {
    let Tests;
    if (test ==='JS') {
        Tests = JSTestData;
    } else if(test === 'HTML') {
        Tests = HTMLTestData;
    } else Tests = CSSTestData;
    const tests = await Tests.find();
    return tests;
}

async function createTests(tests) {
    const createdTests = await JSTestData.insertMany(tests);
    return createTests;   
}

module.exports = { getTests, createTests };

