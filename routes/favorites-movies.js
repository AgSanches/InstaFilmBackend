'use strict'

const express = require('express');
const router = express.Router();
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const favoriteController = require('../controllers/favorite-movies');

router.post('/films/add-favorite', [
    jwtFunctions.checkAuthenticated,
    check('filmId').not().isEmpty(),
    checkErrors,
    jwtFunctions.setUserId
], favoriteController.addFavorite);

router.delete('/films/favorite/:id', [
    jwtFunctions.checkAuthenticated
], favoriteController.deleteFavorite);


module.exports = router;
