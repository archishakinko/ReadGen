const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));


module.exports = (quotes) => {
    return {
       setGenreToBook: setGenreToBook
    };

    function setGenreToBook(book, reqGenre){
        return new Promise((resolve, reject)=>{
            genres.findOrCreate({
                where:{
                    genre: reqGenre
                }
            }).spread((newGenre, created) => {
                book.addBookgenre(newGenre).then(resolve).catch(reject);
                console.log('bookgenre added');
            })
        });
    };

    function getBooksByGenre(book, status){
        return new Promise((resolve, reject) => {
            
        });
    };           
};