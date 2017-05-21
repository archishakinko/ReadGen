const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (bookshelv) => {
    return {
       addBook: addBook,
       changeStatus: changeStatus,
       deleteBook: deleteBook,
       getAllBooks: getAllBooks,
       getBooksByStatus: getBooksByStatus,
       getBook: getBook     
    };

    function getBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
                where:{id: req.params.bookid},
                include:[{
                    all: true,
                    nested: true,
                    required: false
                }]
            }).then(resolve).catch(reject);
        });
    };

    function addBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
            dbcontext.book.findOne({
                where:{id: req.params.bookid}
            }).then((newBook) => {
                newBook.addBookshelv(req.app.locals.user.id, { status: req.body.status }).
                then(resolve).catch(reject);
                console.log('bookshelv add');
            });   
        });
    };

    function deleteBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
            dbcontext.bookshelv.destroy({
                where:{
                    bookId:req.params.bookid,
                    profileId:req.app.locals.user.id
                }
            }).then(resolve).catch(reject);
            console.log('bookshelv delete');
        });
    };
 
    function changeStatus(req,res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.bookshelv.update(
                {status: req.params.status},
                {where: {bookId: req.body.bookid,
                         profileId: req.app.locals.user.id}}
            ).then(resolve).catch(reject);
            console.log('bookshelv set status');
        });
    };

    function getAllBooks(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.bookshelv.findAll({
                where:{profileId: req.app.locals.user.id},
                limit: localLimit,
                raw: true
            })
            .then(resolve).catch(reject);
            console.log('bookshelv get all books');
        });
    };

    function getBooksByStatus(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.bookshelv.findAll({
                where:{ profileId: req.app.locals.user.id,
                        status: req.params.status},
                limit: localLimit,
                raw: true
            })
            .then(resolve).catch(reject);
            console.log('bookshelv get books by status');
        });
    };              
};