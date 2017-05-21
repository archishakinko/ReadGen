const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (genres) => {
    return {
       setGenreToBook: setGenreToBook
    };

    function setGenreToBook(req, res){
        return new Promise((resolve, reject)=>{
            genres.findOrCreate({
                where:{
                    genre: req.body.genre
                }
            }).spread((newGenre, created) => {
                newGenre.addBookgenre(req.body.bookid).then(resolve).catch(reject);
                console.log('bookgenre added');
            })
        });
    };        
};