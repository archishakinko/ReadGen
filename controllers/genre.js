const express = require('express');
const out = require('../utils/out');
 
module.exports = (genreService)=>{
    const router = express.Router();
    
        router.post('/addgenre', (req, res) => {
            genreService.setGenreToBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}