const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);

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
           }).then(resolve).catch(reject);
           console.log('author deleted');
        });
    };
};