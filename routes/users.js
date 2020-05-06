'use strict'

const express = require('express');
const UserController = require('../controllers/users');
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const router = express.Router();

router.get('/users/:limit?', jwtFunctions.checkAuthenticated, UserController.getUsers);
router.get('/user/:id', jwtFunctions.checkAuthenticated, UserController.getUser);
router.put('/user/:id', [
    jwtFunctions.checkAuthenticated,
    check('name').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('role').not().isEmpty(),
    check('email', "Email no válido").isEmail(),
    checkErrors
],UserController.updateUser);
router.delete('/user/:id', jwtFunctions.checkAuthenticated,UserController.deleteUser);


module.exports = router;
