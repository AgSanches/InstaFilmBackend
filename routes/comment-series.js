'use strict'

const express = require('express');
const router = express.Router();
const commentSeries = require('../controllers/comment-series');

router.post('/series/create-comment',  commentSeries.createComment);



module.exports = router;
