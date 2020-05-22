const Sequelize = require('sequelize');
const UserModel = require('./models/users');
const MovieModel = require('./models/movie');
const SeriesModel = require('./models/series');
const CommentsSeries = require('./models/comment-series');

const sequelize = new Sequelize({
    database: 'instafilm',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: './instafilm-db.sqlite',
});

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Serie = SeriesModel(sequelize, Sequelize);
const CommentSerie = CommentsSeries(sequelize, Sequelize)

User.hasMany(Movie, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Movie.belongsTo(User, {
 constraints: false
});

User.hasMany(Serie, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Movie.belongsTo(User, {
    constraints: false
});

/**
 * Series comments
 */
User.hasMany(CommentSerie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Serie.hasMany(CommentSerie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

CommentSerie.belongsTo(Serie, {
    constraints: false
});

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Movie,
    Serie,
    CommentSerie,
    Sequelize
}
