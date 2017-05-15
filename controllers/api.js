const express = require('express');

module.exports = (bookService, bookshelvService, genreService, quoteService, ratingService, reviewService, authorService)=>{
    const router = express.Router();
    const bookController = require('./books')(bookService);
    const bookshelvController = require('./bookshelv')(bookshelvService);
    const genreController = require('./genre')(genreService);
    const quoteController = require('./quote')(quoteService);
    const ratingController = require('./rating')(ratingService);
    const reviewController = require('./review')(reviewService);
    const authorController = require('./authors')(authorService);
   
    router.use('/', bookController);
    router.use('/', bookshelvController);
    router.use('/', genreController);
    router.use('/', quoteController);
    router.use('/', ratingController);
    router.use('/', reviewController);
    router.use('/', authorController);
    
    return router;
}