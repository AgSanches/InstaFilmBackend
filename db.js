const Sequelize = require('sequelize');
const UserModel = require('./models/users');
const MovieModel = require('./models/movie');

const sequelize = new Sequelize({
    database: 'instafilm',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: './instafilm-db.sqlite',
});

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);

User.hasMany(Movie, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Movie.belongsTo(User);

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Sequelize
}
