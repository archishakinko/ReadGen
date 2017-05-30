const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = (authors) => {
    return {
       deleteAuthor: deleteAuthor
    };

    function deleteAuthor(req, res){
        return new Promise((resolve, reject)=>{
          dbcontext.author.destroy({
               where: {
                   id: req.params.authorid
                }
           }).then((resData) => {
                resolve({success: true, data: resData});
           }).catch(reject);
           console.log('author deleted');
        });
    };
};