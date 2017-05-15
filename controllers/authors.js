const express = require('express');
const out = require('../utils/out');
 
module.exports = (authorService)=>{
    const router = express.Router();
    
        router.put('/changeauthor', (req, res) => {
            authorService.changeAuthor(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
   
        router.delete('/deleteauthor/:authorid', (req, res) => {
            authorService.deleteAuthor(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}