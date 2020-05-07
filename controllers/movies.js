'use strict'

const {Movie} = require('../db')

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
        const options = {
            where: {
                id: req.params.id
            }
        }
        Movie.update({
        title: req.body.title, releaseYear: req.body.releaseYear, director: req.body.director,
        image_path: req.body.image_path, duration: req.body.duration, genre: req.body.genre,
        synopsis: req.body.synopsis, cast: req.body.cast, trailer: req.body.trailer
        }, options)
            .then( result => {
                if (result[0] === 0){
                    return res.status(404).json({
                        message: "La película suministrada no existe."
                    })
                }else {
                    Movie.findOne(options).then(movie => {
                        return res.status(200).json({
                            movie
                        })
                    })
                }
            })
            .catch(error => {

                if(!error.errno){
                    const errors = []

                    error.errors.forEach( userError => {
                        errors.push(userError.path);
                    });

                    return res.status(400).json({
                        message: "La película enviada no es válida, comprueba los campos",
                        errors
                    })

                }else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al actualizar la película vuelva a intentarlo en otro momento."
                    })
                }

            })
    },
    deleteMovie: (req, res) => {
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((log) => {
                if (log === 1){
                    return res.status(200).json({
                        message: "Película eliminada."
                    })
                } else {
                    return res.status(404).json({
                        message: "La película no existe."
                    })
                }

            })
            .catch(() => {
                return res.status(500).json({
                    message: "Ha ocurrido un error al eliminar la pelicula, vuelva a intentarlo en otro momento"
                })
            });
    }
}

module.exports = controller;
