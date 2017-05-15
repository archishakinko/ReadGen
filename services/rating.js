const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));


module.exports = (rating) => {
    return {
       rateBook: rateBook
    };

    function rateBook(book, profile, rateVal){
        return new Promise((resolve, reject)=>{
           book.addRating(profile.id, { rate : rateVal }).
           then(resolve).catch(reject);
           console.log('rating add');
        });
    };
          
};