const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (review) => {
    return {
       addReview: addReview,
       deleteReview: deleteReview,
       changeReview: changeReview
    };

    function addReview(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
               where: {id: req.body.bookid}
           }).then((newBook) => {
                newBook.addBookreview(req.app.locals.user.id, { text : req.body.review }).
                then(resolve).catch(reject);
           }).then(resolve).catch(reject);
           console.log('review added');
        });
    };

    function deleteReview(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.review.destroy({
               where: {
                   bookId: req.body.bookid,
                   profileId: req.app.locals.user.id
                }
           }).then(resolve).catch(reject);
           console.log('review deleted');
        });
    };

    function changeReview(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.review.update(
               {text: req.body.review},
               {where: {
                   bookId: req.body.bookid,
                   profileId: req.app.locals.user.id
                }
            }).then(resolve).catch(reject);
           console.log('review changed');
        });
    };
          
};