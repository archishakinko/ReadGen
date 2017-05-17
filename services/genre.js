const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (genres) => {
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
                newGenre.addBookgenre(book.dataValues.id).then(resolve).catch(reject);
                console.log('bookgenre added');
            })
        });
    };

    function getBooksByGenre(book, status){
        return new Promise((resolve, reject) => {
            
        });
    };           
};