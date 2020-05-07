'use strict'

const express = require('express');
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const movieController = require('../controllers/movies');
const router = express.Router();

router.get('/films/:limit?', movieController.getMovies);

router.get('/films/:id', movieController.getMovie);

router.post('/films',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin,
        check('title').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
        check('director').not().isEmpty(),
        check('duration').not().isEmpty(),
        check('genre').not().isEmpty(),
        check('synopsis').not().isEmpty(),
        check('cast').not().isEmpty(),
        check('trailer').not().isEmpty(),
        checkErrors,
        jwtFunctions.setUserId,
    ]
    , movieController.createMovie);

router.put('/films/:id',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin,
        check('title').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
        check('director').not().isEmpty(),
        check('duration').not().isEmpty(),
        check('genre').not().isEmpty(),
        check('synopsis').not().isEmpty(),
        check('cast').not().isEmpty(),
        check('trailer').not().isEmpty(),
    ],  movieController.updateMovie);

router.delete('/films/:id',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin
    ],  movieController.deleteMovie);


module.exports = router;
