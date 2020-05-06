'use strict'

const bcrypt = require('bcrypt');
const jwtFunctions = require('../jwt');
const {Movie, Sequelize} = require('../db')

const controller = {
    getMovies: (req, res) => {

        const options  = {
            order: [
                ['createdAt', "DESC"]
            ]
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
    getMovie: (req, res) => {

        const options = {
            where: {
                id: req.params.id
            }
        }

        Movie.findOne(options).then(movie => {

            if(!movie){
                return res.status(404).json({
                    message: "Película no existente."
                })
            }

            return res.status(200).json(movie);

        }).catch(() =>
            res.status(500).json({
                message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
            }))
    },
    createMovie: (req, res) => {

        Movie.create(req.body)
            .then(movie => {
                return res.status(201).json({
                    movie: movie
                });
            })
            .catch(error => {

                if(!error.parent){
                    const errors = []

                    error.errors.forEach( userError => {
                        errors.push(userError.path);
                    });

                    return res.status(400).json({
                        message: "El usuario enviado no es válido, comprueba los campos",
                        errors
                    })

                } else if (error.parent.errno && error.parent.errno === 19){
                    return res.status(404).json({
                        message: "El usuario proporcionado no existente."
                    })
                } else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al crear el usuario, vuelva a intentarlo en otro momento."
                    })
                }
            });
    },
    updateMovie: (req, res) => {
        return res.status(200).json({
            message: 'Not implemented'
        })
    },
    deleteMovie: (req, res) => {
        return res.status(200).json({
            message: 'Not implemented'
        })
    }
}

module.exports = controller;
