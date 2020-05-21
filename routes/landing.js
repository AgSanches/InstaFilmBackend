'use strict'

const express = require('express');
const router = express.Router();
const landingController = require('../controllers/landing')

router.get('/landing',  landingController.getLanding);


module.exports = router;
