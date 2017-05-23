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
               resolve(result.body.GoodreadsResponse.search.results);
           });
        });
    } 

    function add(req, res){ //ok
        return new Promise((resolve, reject) => {
            needle.getAsync('https://www.goodreads.com/book/title.xml?author='+req.params.author+'&title='+req.params.title+'&key=cBs3uZsK8KJ520XZ7ZJgQ').
            then((founded) => {
                book.findOrCreate({
                    where:{
                        title: founded.body.GoodreadsResponse.book.title,
                        rate:parseInt(founded.body.GoodreadsResponse.book.average_rating),
                        pages:parseInt(founded.body.GoodreadsResponse.book.average_rating)*100,
                        annotation: founded.body.GoodreadsResponse.book.description.substring(0,100) + '...'
                    }
                }).spread((newBook, created) => {
                    author.findOrCreate({
                        where: {
                            name:founded.body.GoodreadsResponse.book.authors.author.name,
                            website:'https://www.google.by/search?q='+ founded.body.GoodreadsResponse.book.authors.author.name
                            }
                    }).spread((newAuthor, created) => {
                        newBook.addBookauthor(newAuthor).then(() => {
                            resolve({success: true, book: newBook, author: newAuthor});
                        }).catch(reject);
                    });
                });
            })
        });
    };

    function deleteFromDb(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.book.destroy({
               where: {
                   id: req.params.bookid
                }
           }).then((resData) => {
                resolve({success: true, data: resData});
           }).catch(reject);
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
            }).then((books)=>{
                resolve({success: true, book: books});
            }).catch(reject);
        });
    };

    function getBooksByRate(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.book.findAll({
                where:{rate: req.params.rate}
            }).then((books)=>{
                resolve({success: true, book: books});
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
            }).then((books)=>{
                 resolve({success: true, book: books});
            }).catch(reject);
        });
    }           
};