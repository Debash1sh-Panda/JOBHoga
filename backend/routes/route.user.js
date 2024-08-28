const express = require('express');
const router = express.Router();

const { register, login, logout, updateProfile, updateProfilePhoto } = require('../controllers/controller.user.js');
const isAuthenticated = require( '../middlewares/isAuthenticated.js');
const { singleUpload } = require('../middlewares/multer.js');

router.post('/register', singleUpload, register);
router.post('/login', login);
router.post('/profile/update', isAuthenticated, singleUpload, updateProfile );
router.get('/logout', logout);
router.post('/profile/photo/update', isAuthenticated, singleUpload, updateProfilePhoto);

module.exports = router;