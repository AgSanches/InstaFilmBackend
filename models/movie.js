'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        title: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        releaseDate: {
            type: type.DATEONLY,
            allowNull: true
        },
        director: {
            type: type.STRING,
            allowNull: true
        },
        image_path: {
            type: type.STRING,
            allowNull: true
        },
        durantion: {
            type: type.INTEGER,
            allowNull: true
        },
        genre: {
            type: type.STRING,
            allowNull: true
        }
    })
}
