'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('comments-series', {
        content: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    })
}
