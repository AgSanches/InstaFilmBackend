'use strict'

const User = require('../db');

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

    },

    createUser: (req, res) => {
        return res.status(200).send({
            message: 'Not implemented.'
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
