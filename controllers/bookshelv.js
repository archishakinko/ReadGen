const express = require('express');
const out = require('../utils/out');
 
module.exports = (bookshelvService)=>{
    const router = express.Router();
    
        router.get('/getAllBooks', (req, res) => {
            bookshelvService.getAllBooks(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
        
        router.get('/getbooksbystatus/:status', (req, res) => {
            bookshelvService.getBooksByStatus(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.get('/getbooks/:bookid', (req, res) => {
            bookshelvService.getBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.post('/addbooksinbookshelv', (req, res) => {
            bookshelvService.addBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.delete('/deletebooksfrombookshelv/:bookid', (req, res) => {
            bookshelvService.deleteBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        });

        router.put('/changestatus', (req, res) => {
            bookshelvService.changeStatus(req, res).then((message) => {
                out.send(req, res, message);
            });
        });                  
     return router;
}