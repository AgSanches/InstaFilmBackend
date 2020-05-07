'use strict'

const bcrypt = require('bcrypt');
const jwtFunctions = require('../jwt');

const {User} = require('../db');

const controller = {
    register: (req, res) => {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.role = "3";

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

    login: (req, res) => {

        const options = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(options)
            .then(user => {
                if (user && bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwtFunctions.createToken(user);
                    return res.status(200).json({access_token: token});
                }
                else {
                    return res.status(401).json({
                        message: "Usuario no existente o contraseña no válida."
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                return res.status(500).json({message: "Ha ocurrido un problema, vuelva a intentarlo en otro momento." })
            });
    }
}

module.exports = controller;
