const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


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
                newGenre.addBookgenre(req.body.bookid).then((resBook) => {
                    resolve({success: true, genre: resBook});
                }).catch(reject);
            }).catch(reject);
        });
    };        
};