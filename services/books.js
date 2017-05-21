const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);
const genres = require('../services/genre')(dbcontext.genre);
const bookshelv = require('../services/bookshelv')(dbcontext.bookshelv);
const rating = require('../services/rating')(dbcontext.rating);
const review = require('../services/review')(dbcontext.review);
const bookauthor = dbcontext.bookauthor;

module.exports = (book, author) => {
    console.log(book);
    return {
       qSearch: qSearch,
       add: add,
       deleteFromDb: deleteFromDb,
       getBooksByGenre: getBooksByGenre,
       getBooksByRate: getBooksByRate,
       getBooksByAuthor: getBooksByAuthor
    };

    function qSearch(req, res){ //ok
        return new Promise((resolve, reject)=>{
           needle.getAsync('https://www.goodreads.com/search/index.xml?q='+req.params.books+'&key=cBs3uZsK8KJ520XZ7ZJgQ').
           then((result)=>{

               add(req, res, result.body.GoodreadsResponse.search.results.work[0]).
                then((result) => {
                    console.log(result);
                });
               resolve(result.body.GoodreadsResponse.search.results);
           });
        });
    } 

    function add(req, res, toAdd){ //ok
        return new Promise((resolve, reject) => {
            book.findOrCreate({
                where:{
                    title:toAdd.best_book.title,
                    rate:parseInt(toAdd.average_rating),
                    pages:parseInt(toAdd.average_rating)*100,
                    annotation:'book'
                }
            }).spread((newBook, created) => {
                author.findOrCreate({
                    where: {
                        name:toAdd.best_book.author.name,
                        website:'https://www.google.by/search?q='+ toAdd.best_book.author.name
                    }
                }).spread((newAuthor, created) => {
                    newBook.addBookauthor(newAuthor).then(resolve).catch(reject);
                });
            });
        });
    };

    function deleteFromDb(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.book.destroy({
               where: {
                   id: req.params.bookid
                }
           }).then(resolve).catch(reject);
           console.log('book deleted');
        });
    };    

    function getBooksByGenre(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.genre.findOne({
                where:{id: req.params.genreid},
                include:[{
                    model: dbcontext.book,
                    as: 'bookgenre'
                }]
            }).then((data)=>{
                resolve(data);
            }).catch(reject);
        });
    };

    function getBooksByRate(req, res){
        return new Promise((resolve, reject) => {
            dbcontext.book.findAll({
                where:{rate: req.params.rate}
            }).then((data)=>{
                resolve(data);
            }).catch(reject);
        });
    }     

    function getBooksByAuthor(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.author.findOne({
                where:{id: req.params.authorid},
                include:[{
                    model: dbcontext.book,
                    as: 'bookauthor'
                }]
            }).then((data)=>{
                resolve(data);
            }).catch(reject);
        });
    }           
};