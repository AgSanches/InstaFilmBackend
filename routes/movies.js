'use strict'

const express = require('express');
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const movieController = require('../controllers/movies');
const router = express.Router();

router.get('/films/:limit?',[jwtFunctions.checkAuthenticated, jwtFunctions.checkAuthenticatedAdmin] ,movieController.getMovies);
router.get('/films/:id',[jwtFunctions.checkAuthenticated, jwtFunctions.checkAuthenticatedAdmin]  ,movieController.getMovie);
router.post('/films',
    [jwtFunctions.checkAuthenticated, jwtFunctions.checkAuthenticatedAdmin, jwtFunctions.setUserId]
    ,movieController.createMovie);
router.put('/films/:id', [jwtFunctions.checkAuthenticated, jwtFunctions.checkAuthenticatedAdmin], movieController.updateMovie);
router.delete('/films/:id', [jwtFunctions.checkAuthenticated, jwtFunctions.checkAuthenticatedAdmin], movieController.deleteMovie);


module.exports = router;
