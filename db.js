const Sequelize = require('sequelize');
const UserModel = require('./models/users');
const MovieModel = require('./models/movie');
const SeriesModel = require('./models/series');
const CommentsSeries = require('./models/comment-series');
const CommentsMovies = require('./models/comment-movies');

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
const CommentSerie = CommentsSeries(sequelize, Sequelize);
const CommentMovie = CommentsMovies(sequelize, Sequelize);

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
    foreignKeyConstraint: true
});


/**
 * Films comments
 */
User.hasMany(CommentMovie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Movie.hasMany(CommentMovie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'filmId',
});

CommentMovie.belongsTo(Movie, {
    foreignKey: 'filmId',
    foreignKeyConstraint: true
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
    CommentMovie,
    Sequelize
}
