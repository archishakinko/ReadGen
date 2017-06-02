const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = (review) => {
    return {
       addReview: addReview,
       deleteReview: deleteReview,
       changeReview: changeReview,
       getReviews: getReviews
    };

    function getReviews(req, res){ //ok
        return new Promise((resolve, reject)=>{
          dbcontext.book.findOne({
              where: {id: req.params.bookid},
              include:{
                    model: dbcontext.profile,
                    as: 'bookreview'
                } 
          }).then((resBooks) => {
              resolve({success: true, review: resBooks});
          }).catch(reject);
        });
    };

    function addReview(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: {id: req.body.bookid}
           }).then((newBook) => {
                newBook.addBookreview(res.locals.user.id, { text : req.body.review }).
                then((resBook) => {
                    resolve({success: true, review: resBook});
             }).catch(reject);
           }).catch(reject);
        });
    };

    function deleteReview(req, res){
        return new Promise((resolve, reject)=>{
           review.destroy({
               where: {
                   bookId: req.body.bookid,
                   profileId: res.locals.user.id
                }
           }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };

    function changeReview(req, res){
        return new Promise((resolve, reject)=>{
           review.update(
               {text: req.body.review},
               {where: {
                   bookId: req.body.bookid,
                   profileId: res.locals.user.id
                }
            }).then((resBook) => {
                resolve({success: true, data: resBook});
            }).catch(reject);
        });
    };
          
};