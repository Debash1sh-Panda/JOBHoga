const express = require('express');
const router = express.Router();

const {registerCompany, companyDetails, companyDetailsById, updateCompany} = require('../controllers/controller.company.js');
const isAuthenticated = require( '../middlewares/isAuthenticated.js');

router.post('/register-company', isAuthenticated, registerCompany);
router.get('/company-details', isAuthenticated, companyDetails);
router.get('/company-details/:id',isAuthenticated, companyDetailsById);
router.put('/update-company/:id', isAuthenticated, updateCompany);

module.exports = router;