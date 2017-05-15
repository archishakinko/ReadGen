const express = require('express');
const out = require('../utils/out');
 
module.exports = (genreService)=>{
    const router = express.Router();
    
        router.delete('/deletegenre/:genreid', (req, res) => {
            genreService.deleteGenre(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/addgenre', (req, res) => {
            genreService.addGenge(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}