'use strict'

const express = require('express');
const router = express.Router();
const landingController = require('../controllers/landing')

router.get('/landing/movies/popular/:limit?',  landingController.getLandingMoviePopular);
router.get('/landing/movies/latest/:limit?',  landingController.getLandingMovieLatest);
router.get('/landing/series/popular/:limit?',  landingController.getLandingSeriePopular);
router.get('/landing/series/latest/:limit?',  landingController.getLandingSerieLatest);


module.exports = router;
