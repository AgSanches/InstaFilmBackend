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
        rol: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 3, // 1 is Adm, 2 Teacher, 3 Student,
            validate: {
                notEmpty: true,
                isIn: [[1,2,3]]
            }
        },
        category: {
            type: type.STRING,
            allowNull: false
        },
        information: {
            type: type.STRING,
            validate: {
            }
        }
    })
}
