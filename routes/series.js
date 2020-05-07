'use strict'

const express = require('express');
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const seriesController = require('../controllers/series');
const router = express.Router();

router.get('/series/:limit?',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin
    ] , seriesController.getSerieses);

router.get('/series/:id',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin
    ]  ,seriesController.getSeries);

router.post('/series',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin,
        check('title').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
        check('director').not().isEmpty(),
        check('seasons').not().isEmpty(),
        check('episodes').not().isEmpty(),
        check('genre').not().isEmpty(),
        check('synopsis').not().isEmpty(),
        check('cast').not().isEmpty(),
        check('trailer').not().isEmpty(),
        checkErrors,
        jwtFunctions.setUserId,
    ]
    , seriesController.createSeries);

router.put('/series/:id',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin,
        check('title').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
        check('director').not().isEmpty(),
        check('seasons').not().isEmpty(),
        check('episodes').not().isEmpty(),
        check('genre').not().isEmpty(),
        check('synopsis').not().isEmpty(),
        check('cast').not().isEmpty(),
        check('trailer').not().isEmpty(),
    ],  seriesController.updateSeries);

router.delete('/series/:id',
    [
        jwtFunctions.checkAuthenticated,
        jwtFunctions.checkAuthenticatedAdmin
    ],  seriesController.deleteSeries);


module.exports = router;
