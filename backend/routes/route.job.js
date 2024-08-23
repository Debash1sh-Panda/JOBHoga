const express = require('express');
const router = express.Router();

const {createJob, allJobDetails, jobDetailsById, adminsJob} = require('../controllers/controller.job.js');
const isAuthenticated = require( '../middlewares/isAuthenticated.js');

router.post('/create-job', isAuthenticated, createJob);
router.get('/all-jobDetails', isAuthenticated, allJobDetails);
router.get('/jobDetails/:id',isAuthenticated, jobDetailsById);
router.get('/adminsJob', isAuthenticated, adminsJob);

module.exports = router;