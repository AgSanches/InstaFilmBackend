'use strict'

const express = require('express');
const UserController = require('../controllers/users');
const jwtFunctions = require('../jwt')

const router = express.Router();

router.get('/users/:limit?', jwtFunctions.checkAuthenticated, UserController.getUsers);
router.get('/user/:id', jwtFunctions.checkAuthenticated,UserController.getUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/user/:id', jwtFunctions.checkAuthenticated, UserController.updateUser);
router.delete('/user/:id', jwtFunctions.checkAuthenticated,UserController.deleteUser);


module.exports = router;
