'use strict'

const {FavoriteSerie} = require('../db');
const {Serie} = require('../db');

const favoriteController = {

    addFavorite: (req, res) => {

        FavoriteSerie.create(req.body)
            .then(favorite => {
                return res.status(201).json({
                    favorite: favorite
                });
            })
            .catch(error => {

                if (error.parent.errno && error.parent.errno === 19){
                    if (error.errors && error.errors[0].validatorKey === "not_unique"){
                        return res.status(400).json({
                            message: "El usuario ya le ha dado me gusta a esta serie."
                        })
                    }
                    else {
                        return res.status(404).json({
                            message: "La serie no existe."
                        })
                    }

                } else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al crear el favorito, vuelva a intentarlo en otro momento."
                    })
                }
            });
    },

    deleteFavorite: (req, res) => {

        const options = {
            where: {
                id: req.params.id,
                userId: req.user.sub
            }
        }

        FavoriteSerie.destroy(options)
            .then((log) => {
                if (log === 1){
                    return res.status(200).json({
                        message: "Favorito eliminado."
                    })
                } else {
                    return res.status(404).json({
                        message: "Campo no existente."
                    })
                }

            })
            .catch(() => {
                return res.status(500).json({
                    message: "Ha ocurrido un error al eliminar el favorito, vuelva a intentarlo en otro momento"
                })
            });
    },

    getFavoritesSeries: (req, res) => {

        const options = {
            order: [
                ['createdAt', "DESC"]
            ],
            include: [
                {
                    model: FavoriteSerie,
                    attributes: ["id"],
                    where: {
                        userId: req.body.userId
                    },
                    as: "favorites"
                }
            ]
        }

        Serie.findAll(options)
            .then(series => res.status(200).json(series))
            .catch(() => {
                return res.status(500).json({
                    message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento."
                })
            })
    }

}

module.exports = favoriteController;
