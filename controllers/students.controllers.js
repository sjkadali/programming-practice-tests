const { response } = require('express');
const Students = require('../models/students.model');

async function createStudent(body) {
    const student = new Students(body);
    await student.save()
        .then(result => {
            return result;
        }).catch(e => {
            throw new Error(e);
    });
}

async function getStudents() {
    const students = await Students.find();
    return students;
}

async function updateStudent(id, updateData) {
    Students.findByIdAndUpdate(id, updateData)
        .then(result => {
           return result;
        }).catch(e => {
            console.log(e);
           throw new Error(e);
    });        
}

async function deleteStudent(id) {
    Students.findByIdAndDelete(id)
        .then(result => {
            return result;
        }).catch(e => {
            console.log(e);
        throw new Error(e);
    });        
}

async function login() {

}

async function getStudentByQuery(query) {
    const students = await Students.find(query);
    return students;
}

module.exports = {
    createStudent, 
    getStudents,    
    updateStudent,
    deleteStudent,
    getStudentByQuery
};