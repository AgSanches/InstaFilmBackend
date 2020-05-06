'use strict'

const express = require('express');
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const movieController = require('../controllers/movies');
const router = express.Router();

router.get('/movies/:limit?', movieController.getMovies);
router.get('/movie/:id', movieController.getMovie);
router.post('/movie', movieController.createMovie);
router.put('/movie/:id', movieController.updateMovie);
router.delete('/movie/:id', movieController.deleteMovie);


module.exports = router;
