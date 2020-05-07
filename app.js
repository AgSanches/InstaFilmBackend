'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const seriesRoutes = require('./routes/series');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/admin', userRoutes);
app.use('/api', authRoutes);
app.use('/api', movieRoutes);
app.use('/api', seriesRoutes);

module.exports = app;
