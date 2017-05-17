const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (rating) => {
    return {
       rateBook: rateBook,
       deleteRate: deleteRate,
       changeRate: changeRate
    };

    function rateBook(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: { id: req.body.bookid }
           }).then((newBook) => {
               if(newBook)
                newBook.addBookrating(req.app.locals.user.id, { rate : req.body.rate }).
                then(resolve).catch(reject);
           }).
           then(resolve).catch(reject);
           console.log('rating add');
        });
    };

    function deleteRate(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.rating.destroy({
               where: { 
                   bookId: req.body.bookid,
                   profileId: req.app.locals.user.id
                 }
           }).then(resolve).catch(reject);
           console.log('rating deleted');
        });
    };

    function changeRate(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.rating.update(
               {rate: req.params.rate},
               {where: { 
                    bookId: req.body.bookid,
                    profileId: req.app.locals.user.id
                }}).then(resolve).catch(reject);
            console.log('rating changed');
        });
    };
          
};