'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('comments-movies', {
        content: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    })
}
