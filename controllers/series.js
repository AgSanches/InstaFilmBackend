'use strict'

const {Serie} = require('../db');
const {CommentSerie} = require('../db')

const controller = {

    getSerieses: (req, res) => {

        const options  = {
            attributes: [
                'id', 'title', 'releaseYear', 'director',
                'seasons', 'episodes', 'genre',
                'synopsis', 'cast', 'trailer',
                'createdAt', 'updatedAt', 'image_path'
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            include: [
                {
                    model:CommentSerie,
                    as: "comments"
                }
            ]
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
    getSeries: (req, res) => {

        const options = {
            attributes: [
                'id', 'title', 'releaseYear', 'director',
                'seasons', 'episodes', 'genre',
                'synopsis', 'cast', 'trailer',
                'createdAt', 'updatedAt', 'image_path'
            ],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model:CommentSerie,
                    as: "comments"
                }
            ]
        }

        Serie.findOne(options).then(serie => {

            if(!serie){
                return res.status(404).json({
                    message: "Serie no existente."
                })
            }

            return res.status(200).json(serie);

        }).catch(() =>
            res.status(500).json({
                message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
            }))
    },
    createSeries: (req, res) => {

        Serie.create(req.body)
            .then(serie => {
                return res.status(201).json({
                    serie: serie
                });
            })
            .catch(error => {

                if(!error.parent){
                    const errors = []

                    error.errors.forEach( userError => {
                        errors.push(userError.path);
                    });

                    return res.status(400).json({
                        message: "La serie enviada no es válida, comprueba los campos",
                        errors
                    })

                } else if (error.parent.errno && error.parent.errno === 19){
                    return res.status(404).json({
                        message: "El usuario proporcionado no existente."
                    })
                } else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al crear la serie, vuelva a intentarlo en otro momento."
                    })
                }
            });
    },
    updateSeries: (req, res) => {
        const options = {
            where: {
                id: req.params.id
            }
        }
        Serie.update({
            title: req.body.title,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            image_path: req.body.image_path,
            seasons: req.body.seasons,
            episodes: req.body.episodes,
            genre: req.body.genre,
            synopsis: req.body.synopsis,
            cast: req.body.cast,
            trailer: req.body.trailer
        }, options)
            .then( result => {
                if (result[0] === 0){
                    return res.status(404).json({
                        message: "La película suministrada no existe."
                    })
                }else {
                    Serie.findOne(options).then(serie => {
                        return res.status(200).json({
                            serie
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
                        message: "La serie enviada no es válida, comprueba los campos",
                        errors
                    })

                }else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al actualizar la serie vuelva a intentarlo en otro momento."
                    })
                }

            })
    },
    deleteSeries: (req, res) => {
        Serie.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((log) => {
                if (log === 1){
                    return res.status(200).json({
                        message: "Serie eliminada."
                    })
                } else {
                    return res.status(404).json({
                        message: "La serie no existe."
                    })
                }

            })
            .catch(() => {
                return res.status(500).json({
                    message: "Ha ocurrido un error al eliminar la serie, vuelva a intentarlo en otro momento"
                })
            });
    }
}

module.exports = controller;
