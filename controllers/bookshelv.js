const express = require('express');
const out = require('../utils/out');
 
module.exports = (bookshelvService)=>{
    const router = express.Router();
    
        router.get('/bookshelvs', (req, res) => {
            bookshelvService.getAllBooks(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
        
        router.get('/bookshelvs/:status', (req, res) => {
            bookshelvService.getBooksByStatus(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/bookshelv/:bookid', (req, res) => {
            bookshelvService.getBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.post('/bookshelvs/:bookid', (req, res) => {
            bookshelvService.addBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.delete('/bookshelvs/:bookid', (req, res) => {
            bookshelvService.deleteBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.put('/bookshelvs/:status', (req, res) => {
            bookshelvService.changeStatus(req, res).then((message) => {
                out.send(req, res, message);
            });
        });                  
     return router;
}