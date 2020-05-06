'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('movies', {
        title: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        releaseYear: {
            type: type.INTEGER,
            allowNull: false,
            validate: {
                min: 1888
            }
        },
        director: {
            type: type.STRING,
            allowNull: false
        },
        image_path: {
            type: type.STRING,
            allowNull: true,
            validate: {
                is: '(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*(\\?.*)?'
            }
        },
        duration: {
            type: type.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        genre: {
            type: type.STRING,
            allowNull: false
        },
        synopsis: {
            type: type.TEXT,
            allowNull: false
        },
        cast: {
            type: type.TEXT,
            allowNull: false
        },
        trailer: {
            type: type.TEXT,
            allowNull: false,
            validate: {
                is: '(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*(\\?.*)?'
            }
        }
        //Relationship with user_id
    })
}
