'use strict'

const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './upload/users-images'});

router.get('/users/:limit?', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.get('/search-users/:search', UserController.getUserByName);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.get('/get-image/:id', UserController.getUserImage);
router.post('/upload-image/:id', md_upload, UserController.uploadUserImage);


module.exports = router;
