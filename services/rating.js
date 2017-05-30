const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


module.exports = (rating) => {
    return {
       rateBook: rateBook,
       deleteRate: deleteRate,
       changeRate: changeRate,
       getRating: getRating
    };

    function getRating(req, res){ //ok
        return new Promise((resolve, reject)=>{
          dbcontext.book.findOne({
              where: {id: req.params.bookid},
              include:{
                    model: dbcontext.profile,
                    as: 'bookrating'
                } 
          }).then((resBooks) => {
              resolve({success: true, rate: resBooks});
          }).catch(reject);
        });
    };

    function rateBook(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: { id: req.body.bookid }
           }).then((newBook) => {
               if(newBook)
                newBook.addBookrating(res.locals.user.id, { rate : req.body.rate }).
                then((resBook) => {
                    resolve({success: true, rate: resBook});
            }).catch(reject);
           }).catch(reject);
        });
    };

    function deleteRate(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.rating.destroy({
               where: { 
                   bookId: req.body.bookid,
                   profileId: res.locals.user.id
                 }
           }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };

    function changeRate(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.rating.update(
               {rate: req.params.rate},
               {where: { 
                    bookId: req.body.bookid,
                    profileId: res.locals.user.id
                }}).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };
          
};