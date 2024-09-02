const express = require('express');
const router = express.Router();

const {registerCompany, companyDetails, companyDetailsById, updateCompany, deleteCompany} = require('../controllers/controller.company.js');
const isAuthenticated = require( '../middlewares/isAuthenticated.js');
const { singleUpload } = require('../middlewares/multer.js');

router.post('/register-company', isAuthenticated, registerCompany);
router.get('/company-details', singleUpload, isAuthenticated, companyDetails);
router.get('/company-details/:id', singleUpload, isAuthenticated, companyDetailsById);
router.put('/update-company/:id', singleUpload, isAuthenticated, updateCompany);
router.delete('/deleteCompany/:id', singleUpload, isAuthenticated, deleteCompany);

module.exports = router;