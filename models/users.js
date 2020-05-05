'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
            }
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
            }
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6,100]
            }
        },
        role: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 3, // 1 Administrador, 2 Editor, 3 Usuario registrado
            validate: {
                notEmpty: true,
                isIn: [[1,2,3]]
            }
        }
    })
}
