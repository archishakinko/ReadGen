module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.name, config.user, config.password, options); 
    const Profile = require('../models/profile')(Sequelize, sequelize);
    const Book = require('../models/books')(Sequelize, sequelize);
    const Genre = require('../models/genre')(Sequelize, sequelize);
    const Author = require('../models/authors')(Sequelize, sequelize);
    const BookAuthors = require('../models/bookAuthors')(Sequelize, sequelize);
    const BookGenres = require('../models/bookGenres')(Sequelize, sequelize);
    const Bookshelv = require('../models/bookshelv')(Sequelize, sequelize);
    const Quote = require('../models/quote')(Sequelize, sequelize);
    const Review = require('../models/review')(Sequelize, sequelize);
    const Rating = require('../models/rating')(Sequelize, sequelize);

    Book.belongsToMany(Author, {as: 'bookauthor', through: BookAuthors, timestamps: true, foreignKey: 'bookId'});
    Author.belongsToMany(Book, {as: 'bookauthor', through: BookAuthors, timestamps: true, foreignKey: 'authorId'});

    Book.belongsToMany(Genre, {as: 'bookgenre', through: BookGenres, timestamps: true, foreignKey: 'bookId'});
    Genre.belongsToMany(Book, {as: 'bookgenre', through: BookGenres, timestamps: true, foreignKey: 'genreId'});

    Book.belongsToMany(Profile, {as: 'bookshelv', through: Bookshelv, timestamps: true, foreignKey: 'bookId'});
    Profile.belongsToMany(Book, {as: 'bookshelv', through: Bookshelv, timestamps: true, foreignKey: 'profileId'});

    Book.belongsToMany(Profile, {as: 'bookreview', through: Review, timestamps: true, foreignKey: 'bookId'});
    Profile.belongsToMany(Book, {as: 'bookreview', through: Review, timestamps: true, foreignKey: 'profileId'});

    Book.belongsToMany(Profile, {as: 'bookrating', through: Rating, timestamps: true, foreignKey: 'bookId'});
    Profile.belongsToMany(Book, {as: 'bookrating', through: Rating, timestamps: true, foreignKey: 'profileId'});

    Book.belongsToMany(Author, {as: 'bookquote', through: Quote, timestamps: true, foreignKey: 'bookId'});
    Author.belongsToMany(Book, {as: 'bookquote', through: Quote, timestamps: true, foreignKey: 'authorId'});

     return {
        profile: Profile,
        book: Book,
        genre: Genre,
        author: Author,
        bookauthor: BookAuthors,
        bookgenre: BookGenres,
        bookshelv: Bookshelv,
        quote: Quote,
        review: Review,
        rating: Rating,
        sequelize: sequelize
    };
};