'use strict'

const {Serie} = require('../db');
const {Movie} = require('../db');

const landingController = {

    getLandingMoviePopular: (req, res) => {

        //TODO: When Movies have valoration, sort by them.
        const options  = {
            attributes: [
                'id', 'title', 'releaseYear', 'image_path'
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            limit: 15
        }

        if (req.params.limit){
            options.limit = req.params.limit;
        }

        Movie.findAll(options)
            .then(movies => res.status(200).json(movies))
            .catch(error => {

                if(error.original.errno === 20) {
                    return res.status(400).json({
                        message: "El parámetro limit proporcionado no es válido, el valor debe ser un número."
                    });
                }
                return res.status(500).json({
                    message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
                })
            })
    },
    getLandingMovieLatest: (req, res) => {

        const options  = {
            attributes: [
                'id', 'title', 'releaseYear', 'image_path'
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            limit: 15
        }

        if (req.params.limit){
            options.limit = req.params.limit;
        }

        Movie.findAll(options)
            .then(movies => res.status(200).json(movies))
            .catch(error => {

                if(error.original.errno === 20) {
                    return res.status(400).json({
                        message: "El parámetro limit proporcionado no es válido, el valor debe ser un número."
                    });
                }
                return res.status(500).json({
                    message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
                })
            })
    },
    getLandingSeriePopular: (req, res) => {

        //TODO: When Series have valoration, sort by them.
        const options  = {
            attributes: [
                'id', 'title', 'releaseYear', 'image_path'
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            limit: 15
        }

        if (req.params.limit){
            options.limit = req.params.limit;
        }

        Serie.findAll(options)
            .then(serieses => res.status(200).json(serieses))
            .catch(error => {

                if(error.original.errno === 20) {
                    return res.status(400).json({
                        message: "El parámetro limit proporcionado no es válido, el valor debe ser un número."
                    });
                }
                return res.status(500).json({
                    message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
                })
            })
    },
    getLandingSerieLatest: (req, res) => {

        const options  = {
            attributes: [
                'id', 'title', 'releaseYear', 'image_path'
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            limit: 15
        }

        if (req.params.limit){
            options.limit = req.params.limit;
        }

        Serie.findAll(options)
            .then(serieses => res.status(200).json(serieses))
            .catch(error => {

                if(error.original.errno === 20) {
                    return res.status(400).json({
                        message: "El parámetro limit proporcionado no es válido, el valor debe ser un número."
                    });
                }
                return res.status(500).json({
                    message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
                })
            })
    },
}


module.exports = landingController;
