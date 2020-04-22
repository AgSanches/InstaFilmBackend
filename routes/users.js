'use strict'

const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/users/:limit?', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.get('/search-users/:search', UserController.getUserByName);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);


module.exports = router;
