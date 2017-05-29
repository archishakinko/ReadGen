const express = require('express');
const out = require('../utils/out');
 
module.exports = (bookService)=>{
    const router = express.Router();
    
        router.get('/books', (req, res) => {
            bookService.qSearch(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/books/:id', (req, res) => {
            bookService.getBook(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });
   
        router.get('/books/:author/:title', (req, res) => {
            bookService.add(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.delete('/books/:bookid', (req, res) => {
            bookService.deleteFromDb(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/booksgenre/:genreid', (req, res) => {
            bookService.getBooksByGenre(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/booksrate/:rate', (req, res) => {
            bookService.getBooksByRate(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/booksauthor/:authorid', (req, res) => {
            bookService.getBooksByAuthor(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });                
    return router;
}