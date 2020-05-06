'use strict'

const express = require('express');
const UserController = require('../controllers/users');
const { check } = require('express-validator');
const checkErrors = require('./validation');
const router = express.Router();

router.get('/users/:limit?', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/user', [
    check('name').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('role').not().isEmpty(),
    check('email', "Email no válido").isEmail(),
    check('password', "Contraseña inválida").isLength({min: 6}),
    checkErrors
],UserController.createUser);
router.put('/user/:id', [
    check('name').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('role').not().isEmpty(),
    check('email', "Email no válido").isEmail(),
    checkErrors
],UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
