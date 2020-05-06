'use strict'

const bcrypt = require('bcrypt');
const jwtFunctions = require('../jwt');

const {User, Sequelize} = require('../db');

const controller = {

    getUsers: (req, res) => {

        const options  = {
            order: [
                ['createdAt', "DESC"]
            ]
        }

        if (req.params.limit){
            options.limit = req.params.limit;
        }

        User.findAll(options)
            .then( users => res.status(200).json(users))
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

    getUser: (req, res) => {

        const options = {
            where: {
                id: req.params.id
            }
        }

        User.findOne(options).then(user => {
            if(!user){
                return res.status(404).json({
                    message: "Usuario no existente."
                })
            }
            return res.status(200).json(user);

        }).catch(() =>
            res.status(500).json({
                message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento." }))
    },

    createUser: (req, res) => {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        User.create(req.body)
            .then(user => {
            return res.status(201).json({
                user:user
            });
        })
            .catch(error => {

            if(!error.errno){
                const errors = []

                error.errors.forEach( userError => {
                    errors.push(userError.path);
                });

                return res.status(400).json({
                    message: "El usuario enviado no es válido, comprueba los campos",
                    errors
                });

            }else {
                return res.status(500).json({
                    message: "Ha ocurrido un error al crear el usuario, vuelva a intentarlo en otro momento."
                })
            }
        });
    },

    updateUser: (req, res) => {

        const options = {
            where: {
                id: req.params.id
            }
        }

        User.update(req.body, options)
            .then( result => {
                if (result[0] === 0){
                    return res.status(404).json({
                        message: "El usuario suministrado no existe."
                    })
                }else {
                    User.findOne(options).then(user => {
                        return res.status(200).json({
                            user
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
                        message: "El usuario enviado no es válido, comprueba los campos",
                        errors
                    })

                }else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al crear el usuario, vuelva a intentarlo en otro momento."
                    })
                }

            })
    },

    deleteUser: (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((log) => {
                if (log === 1){
                    return res.status(204).json({
                        message: "Usuario eliminado."
                    })
                } else {
                    return res.status(404).json({
                        message: "El usuario no existe."
                    })
                }

            })
            .catch(() => {
                return res.status(500).json({
                    message: "Ha ocurrido un error al eliminar al usuario, vuelva a intentarlo en otro momento"
                })
            });
    },
}

module.exports = controller;
