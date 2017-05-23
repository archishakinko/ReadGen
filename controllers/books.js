const express = require('express');
const out = require('../utils/out');
 
module.exports = (bookService)=>{
    const router = express.Router();
    
        router.get('/books/:books', (req, res) => {
            bookService.qSearch(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
   
        router.post('/books/:book', (req, res) => {
            bookService.add(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.delete('/books/:bookid', (req, res) => {
            bookService.deleteFromDb(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/booksgenre/:genreid', (req, res) => {
            bookService.getBooksByGenre(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/booksrate/:rate', (req, res) => {
            bookService.getBooksByRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/booksauthor/:authorid', (req, res) => {
            bookService.getBooksByAuthor(req, res).then((message) => {
                out.send(req, res, message);
            });
        });                
    return router;
}