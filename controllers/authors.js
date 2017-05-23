const express = require('express');
const out = require('../utils/out');
 
module.exports = (authorService)=>{
    const router = express.Router();
    
        router.delete('/authors/:authorid', (req, res) => {
            authorService.deleteAuthor(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}