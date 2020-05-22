'use strict'

const express = require('express');
const router = express.Router();
const jwtFunctions = require('../jwt')
const { check } = require('express-validator');
const checkErrors = require('./validation');
const commentSeries = require('../controllers/comment-series');

router.post('/series/create-comment', [
    jwtFunctions.checkAuthenticated,
    check('content').not().isEmpty(),
    check('seriesId').not().isEmpty(),
    checkErrors,
    jwtFunctions.setUserId
], commentSeries.createComment);

router.delete('/series/comment/:id', [
    jwtFunctions.checkAuthenticated
], commentSeries.deleteComment);


module.exports = router;
