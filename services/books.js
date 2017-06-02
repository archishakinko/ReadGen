const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);
const genres = require('../services/genre')(dbcontext.genre);
const bookshelv = require('../services/bookshelv')(dbcontext.bookshelv);
const rating = require('../services/rating')(dbcontext.rating);
const review = require('../services/review')(dbcontext.review);
const bookauthor = dbcontext.bookauthor;

module.exports = (book, author) => {
    return {
        getBook: getBook,
        qSearch: qSearch,
        add: add,
        deleteFromDb: deleteFromDb,
        getBooksByGenre: getBooksByGenre,
        getBooksByRate: getBooksByRate,
        getBooksByAuthor: getBooksByAuthor
    };

    function getBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
           book.findOne({
                where:{id: req.params.id},
                include:[{
                    all: true,
                    nested: true,
                    required: false
                }]
            }).then((resBook) => {
                resolve({success: true, book: resBook});
            }).catch(reject);
        });
    };

    function qSearch(req, res){ //ok
        return new Promise((resolve, reject)=>{
           needle.getAsync('https://www.goodreads.com/search/index.xml?q='+req.query.q+'&key=cBs3uZsK8KJ520XZ7ZJgQ').
           then((result)=>{
               resolve(result.body.GoodreadsResponse.search.results);
           });
        });
    } 

    function add(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.book.findOne({
                where: {title: req.params.title},
                include:[{
                        all: true,
                        nested: true,
                        required: false
                    }]
            }).then((dbbook) => {
                if(!dbbook){
                    needle.getAsync('https://www.goodreads.com/book/title.xml?author='+req.params.author+'&title='+req.params.title+'&key=cBs3uZsK8KJ520XZ7ZJgQ').
                    then((founded) => {
                        book.findOrCreate({
                            where:{
                                title: founded.body.GoodreadsResponse.book.title,
                                rate:parseInt(founded.body.GoodreadsResponse.book.average_rating),
                                pages:parseInt(founded.body.GoodreadsResponse.book.average_rating)*100,
                                annotation: founded.body.GoodreadsResponse.book.description,
                                img: founded.body.GoodreadsResponse.book.image_url
                            }
                        }).spread((newBook, created) => {
                            if(founded.body.GoodreadsResponse.book.authors.author.length > 1){
                                founded.body.GoodreadsResponse.book.authors.author.forEach((val)=>{
                                     author.findOrCreate({
                                        where: {
                                            name:val.name,
                                            website:'https://www.google.by/search?q='+ val.name
                                        }
                                    }).spread((newAuthor, created) => {
                                        newBook.addBookauthor(newAuthor).then(() => {
                                            dbcontext.book.findOne({
                                                where:{id: newBook.id},
                                                include:[{
                                                    all: true,
                                                    nested: true,
                                                    required: false
                                                }]
                                            }).then((resBook) => {
                                                resolve({success: true, book: resBook});
                                            }).catch(reject);
                                        }).catch(reject);
                                    });
                                })     
                            }else{
                                  author.findOrCreate({
                                        where: {
                                            name:founded.body.GoodreadsResponse.book.authors.author.name,
                                            website:'https://www.google.by/search?q='+ founded.body.GoodreadsResponse.book.authors.author.name
                                        }
                                    }).spread((newAuthor, created) => {
                                        newBook.addBookauthor(newAuthor).then(() => {
                                            dbcontext.book.findOne({
                                                where:{id: newBook.id},
                                                include:[{
                                                    all: true,
                                                    nested: true,
                                                    required: false
                                                }]
                                            }).then((resBook) => {
                                                resolve({success: true, book: resBook});
                                            }).catch(reject);
                                        }).catch(reject);
                                    });
                            }
                        });
                    })
                } else{
                   resolve({success: true, book: dbbook});
                }
            }) 
        });
    };

    function deleteFromDb(req, res){ //ok
        return new Promise((resolve, reject) => {
            book.destroy({
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
            book.findAll({
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