'use strict'

const express = require('express');
const AuthController = require('../controllers/auth');
const { check } = require('express-validator');
const checkErrors = require('./validation');
const router = express.Router();

router.post('/register', [
    check('name').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('role').not().isEmpty(),
    check('email', "Email no válido").isEmail(),
    check('password', "Contraseña inválida").isLength({min: 6}),
    checkErrors,
], AuthController.register);
router.post('/login', [
    check('email', "Email no válido").isEmail(),
    check('password', "Contraseña inválida").isLength({min: 6}),
    checkErrors,
], AuthController.login);


module.exports = router;
