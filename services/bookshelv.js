const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


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
            }).then((resBook) => {
                resolve({success: true, book: resBook});
            }).catch(reject);
        });
    };

    function addBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
            dbcontext.book.findOne({
                where:{id: req.params.bookid}
            }).then((newBook) => {
                newBook.addBookshelv(res.locals.user.id, { status: req.body.status }).
                then((resBook) => {
                    resolve({success: true, book: newBook, status: req.body.status});
                }).catch(reject);
            });   
        });
    };

    function deleteBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
            dbcontext.bookshelv.destroy({
                where:{
                    bookId:req.params.bookid,
                    profileId:res.locals.user.id
                }
            }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };
 
    function changeStatus(req,res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.bookshelv.update(
                {status: req.params.status},
                {where: {bookId: req.body.bookid,
                         profileId: res.locals.user.id}}
            ).then((resBook) => {
                resolve({success: true, data: resBook, newStatus: req.params.status});
            }).catch(reject);
        });
    };

    function getAllBooks(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.book.findAll({
                //raw: true,
                limit: localLimit,
                include:[{
                    model: dbcontext.profile,
                    as:"bookshelv",
                    where:{id: res.locals.user.id}
                },{
                    model: dbcontext.author,
                    as: "bookauthor"
                }]
            })
            .then((resBook) => {
                resolve({success: true, books: resBook});
            }).catch(reject);
        });
    };

    function getBooksByStatus(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.bookshelv.findAll({
                where:{ profileId: res.locals.user.id,
                        status: req.params.status},
                limit: localLimit,
                raw: true
            })
            .then((resBook) => {
                resolve({success: true, book: resBook});
            }).catch(reject);
        });
    };              
};