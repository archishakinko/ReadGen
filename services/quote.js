const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (quotedb) => {
    return {
       addQuote: addQuote,
       deleteQuote: deleteQuote,
       changeQuote: changeQuote
    };

    function addQuote(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: {id: req.body.bookid}
           }).then((newBook) => {
                newBook.addBookquote(req.body.authorid, { quote : req.body.quote }).
                then((resBook) => {
                resolve({success: true, quote: resBook});
            }).catch(reject);
           }).catch(reject);
        });
    };

    function deleteQuote(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.quote.destroy({
               where: {
                   bookId: req.body.bookid,
                   authorId: req.body.authorid
                }
           }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };

    function changeQuote(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.quote.update(
               {quote: req.body.quote},
               {where: {
                   bookId: req.body.bookid,
                   authorId: req.body.authorid
                }
            }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };
          
};