const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));


module.exports = (review) => {
    return {
       addReview: addReview
    };

    function addReview(book, profile, newReview){
        return new Promise((resolve, reject)=>{
           book.addReview(profile.id, { text : newReview }).
           then(resolve).catch(reject);
           console.log('review add');
        });
    };
          
};