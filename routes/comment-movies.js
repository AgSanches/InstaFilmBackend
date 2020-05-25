'use strict'

const express = require('express');
const router = express.Router();
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const commentMovies = require('../controllers/comment-movies');

router.post('/films/create-comment', [
    jwtFunctions.checkAuthenticated,
    check('content').not().isEmpty(),
    check('filmId').not().isEmpty(),
    checkErrors,
    jwtFunctions.setUserId
], commentMovies.createComment);

router.delete('/films/comment/:id', [
    jwtFunctions.checkAuthenticated
], commentMovies.deleteComment);


module.exports = router;
