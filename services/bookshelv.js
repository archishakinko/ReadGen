const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, config);


module.exports = (bookshelv) => {
    return {
       add: add,
       setStatus: setStatus,
       deleteBook: deleteBook,
       getBook: getBook
    };

    function getBook(req, res){
        return new Promise((resolve, reject)=>{
           dbcontext.book.findOne({
                where:{id: req.params.bookid},
                include:[{
                    model: dbcontext.author,
                    as: 'bookauthor',
                    required: false
                },{
                    model: dbcontext.rating,
                    as: 'bookrating',
                    required: false
                }]
            }).then(resolve).catch(reject);
        });
    };

    function add(book, profile, newStatus){
        return new Promise((resolve, reject)=>{
            book.addBookshelv(profile.id, { status: newStatus }).
            then(resolve).catch(reject);
            console.log('bookshelv add');
        });
    };

    function deleteBook(book, profile){
        return new Promise((resolve, reject)=>{
            bookshelv.destroy({
                where:{
                    bookId:book,
                    profileId:profile
                }
            }).then(resolve).catch(reject);
            console.log('bookshelv delete');
        });
    };
 
    function setStatus(book, newStatus){
        return new Promise((resolve, reject) => {
            bookshelv.update(
                {status: newStatus},
                {where: {bookId: book.dataValues.id}}
            ).then(resolve).catch(reject);
            console.log('bookshelv set status');
        });
    };          
};