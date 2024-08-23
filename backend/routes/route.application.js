const express = require('express');
const router = express.Router();

const {applyJob, applicationJobDetails, allApplicants, statusUpdate} = require('../controllers/controller.application.js');
const isAuthenticated = require( '../middlewares/isAuthenticated.js');

router.get('/apply/:id', isAuthenticated, applyJob);
router.get('/application_JobDetails', isAuthenticated, applicationJobDetails);
router.get('/:id/allApplicants', isAuthenticated, allApplicants);
router.post('/status/:id/update', isAuthenticated, statusUpdate);

module.exports = router;