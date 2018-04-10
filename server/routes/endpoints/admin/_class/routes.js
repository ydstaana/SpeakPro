const express = require('express');
const router = express.Router();

const get_all_classes = require('./_v/_v1/get_all_classes');
const get_all_available_classes = require('./_v/_v1/get_all_available_classes');
const get_teachers_classes = require('./_v/_v1/get_teachers_classes');
const get_teachers_available_classes = require('./_v/_v1/get_teachers_available_classes');
const get_classes_of_student = require('./_v/_v1/get_classes_of_student');
const add_class = require('./_v/_v1/add_class');
const drop_class = require('./_v/_v1/drop_class');
const get_student_in_class = require('./_v/_v1/get_student_in_class');
const open_class = require('./_v/_v1/open_class');
const close_class = require('./_v/_v1/close_class');

router.get('/classes', get_all_classes);
router.get('/classes/available', get_all_available_classes);
router.get('/classes/teacher/:id', get_teachers_classes);
router.get('/classes/teacher/:id/available', get_teachers_available_classes);
router.get('/classes/student/:id', get_classes_of_student);
router.get('/classes/:id/student', get_student_in_class);
router.post('/classes/student/:id' ,add_class);
router.post('/classes/student/:id/drop', drop_class);
router.post('/classes', open_class);
router.delete('/classes/:id', close_class);


module.exports = router;