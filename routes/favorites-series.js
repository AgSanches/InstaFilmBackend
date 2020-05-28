'use strict'

const express = require('express');
const router = express.Router();
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const favoriteController = require('../controllers/favorite-series');

router.get('/series-user-favorites', [
    jwtFunctions.checkAuthenticated,
    jwtFunctions.setUserId
], favoriteController.getFavoritesSeries);

router.post('/series/add-favorite', [
    jwtFunctions.checkAuthenticated,
    check('seriesId').not().isEmpty(),
    checkErrors,
    jwtFunctions.setUserId
], favoriteController.addFavorite);

router.delete('/series/favorite/:id', [
    jwtFunctions.checkAuthenticated
], favoriteController.deleteFavorite);


module.exports = router;
