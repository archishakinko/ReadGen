const express = require('express');
const out = require('../utils/out');
 
module.exports = (bookService)=>{
    const router = express.Router();
    
        router.get('/search/:books', (req, res) => {
            bookService.qSearch(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
   
        router.post('/addbookindb/:book', (req, res) => {
            bookService.add(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.delete('/deletebookfromdb/:bookid', (req, res) => {
            bookService.deleteFromDb(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/getbookbygenre/:genreid', (req, res) => {
            bookService.getBooksByGenre(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/getbookbyrate/:rate', (req, res) => {
            bookService.getBooksByRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/getbookbyauthor/:authorid', (req, res) => {
            bookService.getBooksByAuthor(req, res).then((message) => {
                out.send(req, res, message);
            });
        });                
    return router;
}