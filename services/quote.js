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

    function addQuote(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: {id: req.body.bookid}
           }).then((newBook) => {
                newBook.addBookquote(req.body.authorid, { quote : req.body.quote }).
                then(resolve).catch(reject);
           }).then(resolve).catch(reject);
           console.log('quote added');
        });
    };

    function deleteQuote(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.quote.destroy({
               where: {
                   bookId: req.body.bookid,
                   authorId: req.body.authorid
                }
           }).then(resolve).catch(reject);
           console.log('quote deleted');
        });
    };

    function changeQuote(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.quote.update(
               {quote: req.body.quote},
               {where: {
                   bookId: req.body.bookid,
                   authorId: req.body.authorid
                }
            }).then(resolve).catch(reject);
           console.log('quote changed');
        });
    };
          
};