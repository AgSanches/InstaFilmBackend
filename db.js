const Sequelize = require('sequelize');
const UserModel = require('./models/users')

const sequelize = new Sequelize({
    database: 'instafilm',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: './instafilm-db.sqlite',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Sequelize
}
