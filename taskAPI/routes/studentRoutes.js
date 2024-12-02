const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.post('/byId/:id', studentController.getStudentById);
router.post('/update/:id', studentController.updateStudent);
router.post('/delete/:id', studentController.deleteStudent);

module.exports = router;
