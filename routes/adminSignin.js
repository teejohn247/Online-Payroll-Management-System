const express = require('express');
const signin = require('../controllers/adminSignin');
const employees = require('../controllers/employees');
const updateEmployee = require('../controllers/updateEmployee');
const getAll = require('../controllers/getEmployee');
const getOne = require('../controllers/getOne');



const router = express.Router();

router.post('/auth/signin', signin);
router.post('/auth/employee', employees);
router.put('/update/:id', updateEmployee);
router.get('/employees', getAll);
router.get('/employee/:id', getOne);


module.exports = router;
