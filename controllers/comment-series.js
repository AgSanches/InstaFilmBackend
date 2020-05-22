'use strict'

const {CommentSerie} = require('../db')

const commentsController = {

    createComment: (req, res) => {

        CommentSerie.create(req.body)
            .then(comment => {
                return res.status(201).json({
                    comment: comment
                });
            })
            .catch(error => {

                if(!error.parent){
                    const errors = []

                    error.errors.forEach( userError => {
                        errors.push(userError.path);
                    });

                    return res.status(400).json({
                        message: "El comentario enviado no es válido, comprueba los campos",
                        errors
                    })

                } else if (error.parent.errno && error.parent.errno === 19){
                    return res.status(404).json({
                        message: "El usuario proporcionado no existe o la serie no existe."
                    })
                } else {
                    return res.status(500).json({
                        message: "Ha ocurrido un error al crear el comentario, vuelva a intentarlo en otro momento."
                    })
                }
            });

    }
}

module.exports = commentsController;
