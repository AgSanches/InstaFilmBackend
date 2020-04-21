'use strict'

const {User, Sequelize} = require('../db');
const validator = require('validator');
const crypto = require('crypto')

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

    getUserByName: (req, res) => {
        const search = `%${req.params.search}%`
        const options = {
            order: [
                ['createdAt', "DESC"]
            ],
            where: {
                name: {
                    [Sequelize.Op.like]: search
                }
            }
        }

        User.findAll(options).then(user => {
            return res.status(200).json(user);
        }).catch(() =>
            res.status(500).json({
                message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento." }))
    },

    createUser: (req, res) => {
        try {
            req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex");
        } catch (e) {
            return res.status(400).json({
                message: "La contraseña no ha sido sumistrada."
            })
        }

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
                })

            }else {
                return res.status(500).json({
                    message: "Ha ocurrido un error al crear el usuario, vuelva a intentarlo en otro momento."
                })
            }
        });
    },

    updateUser: (req, res) => {
        return res.status(200).send({
            message: 'Not implemented.'
        });
    },

    deleteUser: (req, res) => {
        return res.status(200).send({
            message: 'Not implemented.'
        });
    },

    uploadUserImage: (req, res) => {
        return res.status(200).send({
            message: 'Not implemented.'
        });
    },

    getUserImage: (req, res) => {
        return res.status(200).send({
            message: 'Not implemented.'
        });
    }
}

module.exports = controller;
